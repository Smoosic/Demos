
import { mainApp } from './mainApp';
import { asyncDemo } from './asyncDemo';
import { syncDemo } from './syncDemo';
import { Smo } from '../index';
import { customMenuApp } from './customMenuDialog';
import { fileConversionApp } from './fileConversionDemo';

export class runner { 
  static main() {
    // Smo needs to be exported for language strings to be loaded
    // We will find a better way to do this.
    (window as any).Smo = Smo;
    mainApp.run();
  }
  static async asyncDemoMain() {
    await asyncDemo.run();
  }
  static async asyncLoadFile() {
    const path = 'https://smoosic.github.io/SmoScores/hymns/Precious Lord.json';
    await Smo.SuiApplication.configure({
      mode: 'library',
      scoreDomContainer: 'outer-container',
      remoteScore: path
    });
  }
  static async asyncLoadXml() {
    const path = 'https://smoosic.github.io/SmoScores/Beethoven_AnDieFerneGeliebte.xml';
    await Smo.SuiApplication.configure({
      mode: 'library',
      scoreDomContainer: 'outer-container',
      remoteScore: path
    });
  }
  static async syncDemoMain() {
    (window as any).Smo = Smo; // see above comment
    await syncDemo.run();
  }
  static async demoMenuDialog() {
    (window as any).Smo = Smo; // see above comment
    await customMenuApp.run();
  }
  static async runFileConversionDemo() {
    (window as any).Smo = Smo; // see above comment
    await fileConversionApp.run();
  }
}