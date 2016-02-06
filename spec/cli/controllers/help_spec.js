import h from '../../spec_helper';
import path from 'path';
import MainCliRouter from '../../../src/cli';

describe('controller help:', () => {
  it('should empty call redirect to help', () => {
    const cli = new MainCliRouter({
      path: path.join(__dirname, '..', '..', '..', '..', 'bin', 'usage.txt'),
      controllers_root: path.join(__dirname, '..', '..', '..', '..', 'src', 'cli', 'controller'),
    });

    const argv = [];
    return h.expect(cli.run(argv)).to.eventually.match(/Examples:/);
  });
});
