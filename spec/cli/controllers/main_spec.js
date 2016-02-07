import h from '../../spec_helper';
import path from 'path';
import MainCliRouter from '../../../src/cli';

describe('controller main:', () => {
  const cli = new MainCliRouter({
    path: path.join(__dirname, '..', '..', '..', '..', 'bin', 'usage.txt'),
    controllers_root: path.join(__dirname, '..', '..', '..', '..', 'src', 'cli', 'controller'),
  });
  const getDocoptResult = (argv) => cli._cli.docopt({ exit: false, argv });

  it('should track one word', () => {
    const docoptResult = getDocoptResult(['banana']);
    h.expect(docoptResult['<track>']).to.deep.equal(['banana']);
  });

  it('should track two words', () => {
    const docoptResult = getDocoptResult(['banana', 'pizza']);
    h.expect(docoptResult['<track>']).to.deep.equal(['banana', 'pizza']);
  });

  it('should track one "two words"', () => {
    const docoptResult = getDocoptResult(['banana pizza']);
    h.expect(docoptResult['<track>']).to.deep.equal(['banana pizza']);
  });

  it('should set option lang to en', () => {
    const docoptResult = getDocoptResult(['banana', '--lang', 'en']);
    h.expect(docoptResult['<track>']).to.deep.equal(['banana']);
    h.expect(docoptResult['--lang']).to.deep.equal(['en']);
  });

  it('should set option lang to en and pt', () => {
    const docoptResult = getDocoptResult(['banana', '--lang', 'en', '--lang', 'pt']);
    h.expect(docoptResult['<track>']).to.deep.equal(['banana']);
    h.expect(docoptResult['--lang']).to.deep.equal(['en', 'pt']);
  });
});
