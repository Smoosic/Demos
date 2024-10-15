import { runner } from './src/runner';
import { SuiApplication, SuiDom } from 'smoosic';

/**
 * There are a lot of dynamic constructors in Smoosic, we need to import those symbols so the runtime can find them
 * when it needs to.  They are used when deserializing scores, and for some UI elements.
 * SmoNamespace.value contains the global namespace value for Smoosic used for dynamic constructors.  
 * Demo projects can change the Smo namespace to  match their default namespace.
 */
export const Smo = { SuiApplication, SuiDom }
export const demo = { runner, Smo };
export default demo;
