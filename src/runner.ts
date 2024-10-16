
import { mainApp } from './mainApp';
import { asyncDemo } from './asyncDemo';
import { syncDemo } from './syncDemo';
import { Smo } from '../index';

export class runner { 
  static main() {
    mainApp.run();
  }
  static async asyncDemoMain() {
    await asyncDemo.run();
  }
  static async asyncLoadFile() {
    const path = 'https://smoosic.github.io/Smoosic/release/library/hymns/Precious Lord.json';
    await Smo.SuiApplication.configure({
      mode: 'library',
      scoreDomContainer: 'outer-container',
      remoteScore: path
    });
  }
  static async asyncLoadXml() {
    const path = 'https://smoosic.github.io/Smoosic/release/library/Beethoven_AnDieFerneGeliebte.xml';
    await Smo.SuiApplication.configure({
      mode: 'library',
      scoreDomContainer: 'outer-container',
      remoteScore: path
    });
  }
  static async syncDemoMain() {
    await syncDemo.run();
  }
}