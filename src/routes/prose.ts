import * as fs from 'fs/promises';
import { parse } from 'yaml';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET() {

    let f = null;
    try {
      f = await fs.open('./content/pages/prose.yml');
      const yaml = await f.readFile({ encoding: 'utf-8' });

      const prose = parse(yaml);

      console.log('read file', prose);

      return {
        status: 200,
        headers: { },
        body: {
          prose
        }
      };

    } catch (e) {
      console.log('some error happened', e);

      return {
        status: 500
      };
    } finally {
      await f?.close();
    }
}