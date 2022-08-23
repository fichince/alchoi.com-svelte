import type { PageServerLoad } from './$types';
import { error } from "@sveltejs/kit";
import { readBlogPosts } from '$lib/utils';

export const load : PageServerLoad = async () => {

  try {

    const posts = await readBlogPosts();

    return {
      posts,
      pageTitle: 'Blog',
    };

  } catch (e) {
    console.log('some error happened', e);
    throw error(500);
  }
}