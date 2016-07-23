import { CliController } from 'cli-router';
import Main from '../../main';
import Saver from '../../saver';
import Formatter from '../../formatter';
import c from 'chalk';
import firebase from 'firebase';

class MainController extends CliController {
  index(params) {
    const main = new Main(params);
    const trackWords = params.track;
    const languages = params.lang;

    const formatter = new Formatter(params);
    const willSendToFirebase = params.send;

    let db;

    console.error(c.gray('-----------------'));
    console.error('# Tracking tweets:', trackWords);
    console.error('# Languages:', languages);
    if (params.send) {
      console.error('# Firebase repository:', process.env.FIREBASE_URL);
      firebase.initializeApp({
        apiKey: process.env.FIREBASE_APIKEY,
        databaseURL: process.env.FIREBASE_DATABASEURL,
      });
      db = firebase.database();
    }
    console.error(c.gray('-----------------'));

    return main.run().map((tweet) => {
      if (tweet) {
        formatter.format([tweet]).map((line) => console.log(line));
        if (willSendToFirebase) {
          const saver = new Saver();
          saver.save(db, trackWords, tweet);
        }
      }
    });
  }
}

export default MainController;
