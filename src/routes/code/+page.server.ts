import { error } from '@sveltejs/kit';
import { readYaml } from '$lib/utils';
import type { PageServerLoad } from './$types';

export const load : PageServerLoad = async () => {
  try {
    const code = await readYaml('./content/pages/code.yml');
    return { 
      code,
      pageTitle: 'Code',
    };

  } catch (e) {
    console.log('some error happened', e);
    throw error(500);
  }
}