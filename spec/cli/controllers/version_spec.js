import h from '../../spec_helper';
import path from 'path';
import MainCliRouter from '../../../src/cli';

describe('controller version:', () => {
  const cli = new MainCliRouter({
    path: path.join(__dirname, '..', '..', '..', '..', 'bin', 'usage.txt'),
    controllers_root: path.join(__dirname, '..', '..', '..', '..', 'src', 'cli', 'controller'),
  });

  const getDocoptResult = (argv) => cli._cli.docopt({ exit: false, argv });

  it('should --version get current version', () => {
    const docoptResult = getDocoptResult(['--version']);
    h.expect(docoptResult['--version']).to.equal(true);
  });

  it('should -V get current version', () => {
    const docoptResult = getDocoptResult(['-V']);
    h.expect(docoptResult['--version']).to.equal(true);
  });
});
