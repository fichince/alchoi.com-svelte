import type { RequestHandler } from './$types';
import genImage from '$lib/genImage';

export const GET : RequestHandler = async () => {

  return new Response(await genImage());
};