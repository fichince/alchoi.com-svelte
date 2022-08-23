import type { RequestHandler } from "@sveltejs/kit";
import { readBlogPosts } from '$lib/utils';

export const GET : RequestHandler = async () => {

  try {

    const posts = await readBlogPosts();

    return {
      status: 200,
      body: {
        posts
      }
    };

  } catch (e) {
    console.log('some error happened', e);
    return { status: 500 };

  }
}