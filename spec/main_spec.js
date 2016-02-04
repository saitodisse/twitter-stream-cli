import h from './spec_helper';
import Main from '../src/main';

describe('Main:', () => {
  it('should execute run() from Main', () => {
    const main = new Main();
    return h.expect(main.run()).to.eventually.equal('TODO: Hello World');
  });
});
