import type { PageServerLoad } from './$types';
import * as fs from 'fs/promises';
import * as path from 'path';
import matter from 'gray-matter';
import { error } from '@sveltejs/kit';

import { BLOG_ROOT } from '$lib/utils';

export const load : PageServerLoad = async ({ params }) => {

  const { slug } = params;

  let f = null;
  try {

    f = await fs.open(path.join(BLOG_ROOT, slug, 'index.md'));
    const text = await f.readFile({ encoding: 'utf-8' });

    const parsed = matter(text);
    const { data, content } = parsed;

    const post : App.BlogPost = {
      ...data as App.BlogPost,

      // convert to string, otherwise, it gets passed as a Date object 
      // during prerendering
      date: data.date.toISOString(),
      content,
    };

    console.log(`Loaded ${data.title}`);

    return {
      post,
      pageTitle: post.title,
      description: post.description,
    };
  } catch (e) {
    console.log('some error happened', e);
    throw error(500);
  } finally {
    f?.close();
  }
};