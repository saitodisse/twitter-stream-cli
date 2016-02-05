import h from '../../spec_helper';
import path from 'path';
import MainCliRouter from '../../../src/cli';

describe('controller version:', () => {
  it('should --version get current version', () => {
    const cli = new MainCliRouter({
      path: path.join(
        __dirname, '..', '..', '..', '..', 'bin', 'usage.txt'),
      controllers_root: path.join(
        __dirname, '..', '..', '..', '..', 'src', 'cli', 'controller'),
    });

    const argv = ['--version'];
    h.expect(cli.run(argv)).to.eventually.match(/version/);
  });
});
