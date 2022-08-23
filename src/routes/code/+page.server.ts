import type { RequestHandler } from '@sveltejs/kit';
import { readYaml } from '$lib/utils';

export const GET : RequestHandler = async () => {
  try {
    const code = await readYaml('./content/pages/code.yml');
    return {
      status: 200,
      body: {
        code
      }
    };

  } catch (e) {
    console.log('some error happened', e);

    return {
      status: 500
    };
  }
}