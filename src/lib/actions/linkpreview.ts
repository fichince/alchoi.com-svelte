import walk from 'dom-walk';
import LinkPreview from '$lib/components/LinkPreview.svelte';
import type { SvelteComponent } from 'svelte';

const linkpreview = (node : HTMLElement) => {
  const links : HTMLElement[] = [];
  walk(node, (n : HTMLElement) => {
    if (n.nodeName === 'A') {
      links.push(n);
    }
  });

  console.log('links', links);
  links.forEach((link) => {
    console.log('here', link.attributes['href']);
    let component : SvelteComponent;
    link.addEventListener('mouseenter', (e) => {
      console.log('over!', e, link.attributes['href']);

      component = new LinkPreview({
        target: document.body,
        props: {
          x: e.screenX,
          y: e.screenY,
        }
      });
    });

    link.addEventListener('mouseleave', (e) => {
      component?.$destroy();
    });
  });

  return {
    destroy: () => {
      console.log('destroy');
    }
  };
};

export default linkpreview;