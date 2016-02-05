import { CliController } from 'cli-router';
import Main from '../../main';

class MainController extends CliController {
  index(params) {
    const main = new Main(params);
    return main.run();
  }
}

export default MainController;
