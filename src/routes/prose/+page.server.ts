import type { RequestHandler } from '@sveltejs/kit';
import { readYaml } from '$lib/utils';

export const GET : RequestHandler = async () => {
  try {
    const prose = await readYaml('./content/pages/prose.yml');
    return {
      status: 200,
      body: {
        prose
      }
    };

  } catch (e) {
    console.log('some error happened', e);

    return {
      status: 500
    };
  }
}