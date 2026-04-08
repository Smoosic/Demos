import { Smo } from '../index';
import { SmoMode } from 'smoosic';
/**
 * This is the Smoosic full application, running in the browser window.  It just starts
 * Smoosic in application mode.  There are some dependencies on the web page
 * that hosts the application, such as: it needs to contain the music fonts and at least one
 * sound.  See demo.html.
 */
export class mainApp {
  static run() {
    // Create the DOM scaffolding
    const domContainer = document.getElementById('smoo');    
    if (!domContainer) {
      throw('No element for Smoosic!');
    }
    const mode: SmoMode = 'application';
    const config = { mode, domContainer };
    Smo.SuiApplication.configure(config);
  }
}