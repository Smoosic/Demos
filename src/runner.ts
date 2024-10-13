
import { Smo } from '../index';

// export type SMO = demoSmo;
export type SmoMode = 'library' | 'application' | 'translate';
export class runner { 
  static main() {
    const dom = document.getElementById('smoo');
    if (!dom) {
      throw('No element for Smoosic!');
    }
    Smo.SuiDom.createUiDom(dom);
    const mode: SmoMode = 'application'
    const config = { mode, leftControls: 'controls-left', topControls: 'controls-top'
      , scoreDomContainer: 'smo-scroll-region'  };
    Smo.SuiApplication.configure(config);
  }
}