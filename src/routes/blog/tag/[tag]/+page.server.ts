import type { PageServerLoad } from './$types';
import { readBlogPosts } from '$lib/utils';
import { error } from '@sveltejs/kit';

export const load : PageServerLoad = async ({ params }) => {

  try {

    const posts = await readBlogPosts();

    return {
      posts,
      selectedTag: params.tag,
      pageTitle: `Blog (${params.tag})`,
    };

  } catch (e) {
    console.log('some error happened', e);
    throw error(500);
  }
}