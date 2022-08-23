import { readYaml } from '$lib/utils';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load : PageServerLoad = async () => {
  try {
    const prose = await readYaml('./content/pages/prose.yml');
    return { 
      prose,
      pageTitle: 'Prose'
    };

  } catch (e) {
    console.log('some error happened', e);
    throw error(500);
  }
}