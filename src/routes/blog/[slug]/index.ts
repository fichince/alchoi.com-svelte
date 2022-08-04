import type { RequestHandler } from './__types/index';
import * as fs from 'fs/promises';
import * as path from 'path';
import matter from 'gray-matter';

const BLOG_ROOT = './content/blog';

export const GET : RequestHandler = async ({ params }) => {

  const { slug } = params;

  let f = null;
  try {

    f = await fs.open(path.join(BLOG_ROOT, slug, 'index.md'));
    const text = await f.readFile({ encoding: 'utf-8' });

    const parsed = matter(text);
    const { data, content } = parsed;

    const post : App.BlogPost = {
      content,
      ...data as App.BlogPost
    };

    return { 
      status: 200,
      body: {
        post
      }
    };
  } catch (e) {
    console.log('some error happened', e);
    return { status: 500 };
  } finally {
    f?.close();
  }
};