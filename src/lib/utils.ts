import * as fs from 'fs/promises';
import * as path from 'path';
import matter from 'gray-matter';

import sortBy from 'lodash/sortBy';
import reverse from 'lodash/reverse';
import clamp from 'lodash/clamp';
import map from 'lodash/map';
import mapValues from 'lodash/mapValues';

import { parse } from 'yaml';
import { remark } from 'remark';
import strip from 'strip-markdown';

import type { Index } from 'lunr';
import lunr from 'lunr';

export const BLOG_ROOT = './content/blog';

export const stripMarkdown = (md : string | undefined) : string => {
  if (!md) return '';
  return remark().use(strip).processSync(md).toString().trim();
};

export const readBlogPosts = async () => {
  let dir = null;

  const entries : App.BlogPost[] = [];

  dir = await fs.opendir(BLOG_ROOT);

  for await (const dirent of dir) {
    if (dirent.isDirectory()) { 

      let f = null;
      try {
        f = await fs.open(path.join(BLOG_ROOT, dirent.name, 'index.md'));
        const contents = await f.readFile({ encoding: 'utf-8' });

        const { data, content } = matter(contents);

        entries.push({
          ...data as App.BlogPost,

          // convert to string, otherwise, it gets passed as a Date object 
          // during prerendering
          date: data.date.toISOString(),
          slug: dirent.name,
          content,
        });
      } finally {
        await f?.close();
      }
    }
  }

  return reverse(sortBy(entries, 'date'))
};

export const readYaml = async (file : string) => {
  let f = null;
  try {
    f = await fs.open(file);
    const yaml = await f.readFile({ encoding: 'utf-8' });

    const result = parse(yaml);
    return result;

  } finally {
    await f?.close();
  }
};

const HL_CONTEXT = 15;
export const extractHighlights = 
  (source : string, positions? : App.MatchPositions, includeFull? : boolean) : 
  App.Highlight[] => {

  if (!positions) return [];

  const src = stripMarkdown(source);

  const result = map(positions.position, (pos) : App.Highlight => {
    const [ matchStart, matchLength ] = pos;

    if (!includeFull) {
      const start = clamp(matchStart - HL_CONTEXT, 0, src.length);
      const end = clamp(matchStart + matchLength + HL_CONTEXT, 0, src.length);

      const str = src.substring(start, end);

      const shift = matchStart - HL_CONTEXT;
      const hlStart = shift > 0 ? HL_CONTEXT : HL_CONTEXT + shift;

      const before = str.substring(0, hlStart);
      const highlight = str.substring(hlStart, hlStart + matchLength);
      const after = str.substring(hlStart + matchLength);

      return { before, highlight, after };
    } else {
      const start = 0;
      const end = src.length;

      const before = src.substring(0, matchStart);
      const highlight = src.substring(matchStart, matchStart + matchLength);
      const after = src.substring(matchStart + matchLength);

      return { before, highlight, after };
    }
  });

  return result;
};

export const createSearchIndex = (posts : App.BlogPost[]) : Index => {
  const idx : Index = lunr(function() {
    this.ref('slug');
    this.field('title');
    this.field('description');
    this.field('content');
    this.metadataWhitelist = ['position'];

    for (let post of posts) {
      this.add(mapValues(post, stripMarkdown));
    }
  });

  return idx;
};