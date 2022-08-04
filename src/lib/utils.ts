import * as fs from 'fs/promises';
import * as path from 'path';
import matter from 'gray-matter';
import sortBy from 'lodash/sortBy';
import reverse from 'lodash/reverse';

export const BLOG_ROOT = './content/blog';

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

        const { data } = matter(contents);

        entries.push({
          ...data as App.BlogPost,
          slug: dirent.name,
        });
      } finally {
        await f?.close();
      }
    }
  }

  return reverse(sortBy(entries, 'date'))
};