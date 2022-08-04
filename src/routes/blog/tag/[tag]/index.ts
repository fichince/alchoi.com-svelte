import type { RequestHandler } from './__types/index';
import { readBlogPosts } from '$lib/utils';

export const GET : RequestHandler = async ({ params }) => {

  try {

    const posts = await readBlogPosts();

    return {
      status: 200,
      body: {
        posts,
        selectedTag: params.tag,
      }
    };

  } catch (e) {
    console.log('some error happened', e);
    return { status: 500 };

  }
}