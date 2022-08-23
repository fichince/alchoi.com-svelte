/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
  // interface Locals {}
  // interface Platform {}
  // interface Session {}

  type BlogPost = {
    slug : string,
    date : string,
    description: string, 
    title: string,
    tags?: string[],
    content?: string,
  }

  type MatchPositions = {
    position: number[][];
  }

  type SearchResultMetadata = {
    title?: MatchPositions,
    description?: MatchPositions,
    content?: MatchPositions,
  }

  type Highlight = {
    before?: string,
    highlight?: string,
    after?: string,
  };

  type ShowcaseItem = {
    title: string,
    description: string,
    image?: string,
    url?: string,
    excerpt?: string,
  };

}
