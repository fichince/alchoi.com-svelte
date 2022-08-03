import type { RequestHandler } from "@sveltejs/kit";
import * as fs from 'fs/promises';
import * as path from 'path';
import matter from 'gray-matter';
import sortBy from 'lodash/sortBy';
import reverse from 'lodash/reverse';

const BLOG_ROOT = './content/blog';

export const GET : RequestHandler = async () => {

  let dir = null;

  const entries = [];

  try {

    dir = await fs.opendir(BLOG_ROOT);

    for await (const dirent of dir) {
      if (dirent.isDirectory()) { 

        let f = null;
        try {
          f = await fs.open(path.join(BLOG_ROOT, dirent.name, 'index.md'));
          const contents = await f.readFile({ encoding: 'utf-8' });

          const { data } = matter(contents);

          entries.push({
            slug: dirent.name,
            ...data,
          });
        } finally {
          await f?.close();
        }
      }
    }

    return {
      status: 200,
      body: {
        posts: reverse(sortBy(entries, 'date'))
      }
    };
  } catch (e) {
    console.log('some error happened', e);
    return { status: 500 };

  } finally {
  }
}