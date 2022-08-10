import { describe, it, expect } from 'vitest';
import { 
  stripMarkdown, 
  extractHighlights
} from '$lib/utils';

describe('Some utils tests', () => {
  it('should strip markdown', () => {
    const result = stripMarkdown('this is _some_ markdown');
    expect(result).to.equal('this is some markdown');
  });

  describe('Search result display', () => {

    const source = `this is some content that we would search and then highlight the found results`;

    it('should return highlights', () => {

      const result = extractHighlights(source, { position: [
        [ source.indexOf('search'), 'search'.length ], // middle of the string
        [ source.indexOf('some'), 'some'.length ], // near the beginning
        [ source.indexOf('found'), 'found'.length ], // near the end
        [ source.indexOf('this'), 'this'.length ], // right at the beginning
        [ source.indexOf('results'), 'results'.length ], // right at the end
      ]});

      console.log('result', result);

      const [ first, second, third, fourth, fifth ] = result;

      expect(first).to.have.property('before', ' that we would ');
      expect(first).to.have.property('highlight', 'search');
      expect(first).to.have.property('after', ' and then highl');

      expect(second).to.have.property('before', 'this is ');
      expect(second).to.have.property('highlight', 'some');
      expect(second).to.have.property('after', ' content that w');

      expect(third).to.have.property('before', ' highlight the ');
      expect(third).to.have.property('highlight', 'found');
      expect(third).to.have.property('after', ' results');

      expect(fourth).to.have.property('before', '');
      expect(fourth).to.have.property('highlight', 'this');
      expect(fourth).to.have.property('after', ' is some conten');

      expect(fifth).to.have.property('before', 'ight the found ');
      expect(fifth).to.have.property('highlight', 'results');
      expect(fifth).to.have.property('after', '');

    });
  });
});