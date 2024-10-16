import { runner } from './src/runner';
import { SuiApplication, SuiDom, SmoScore, IsPitchLetter, 
  SmoMusic, SmoMeasure, SmoNote, SmoOrnament, SmoInstrument, SmoSystemStaff,
  SmoSystemGroup, SmoSelector, dynamicCtorInit, SmoBeamer } from 'smoosic';
/**
 * Expose the Smoosic symbols we need in the demo programs, and add them to our 
 * default namespace
 */
export const Smo = { SuiApplication, SuiDom, SmoScore, IsPitchLetter, 
  SmoMusic, SmoMeasure, SmoNote, SmoOrnament, SmoInstrument, SmoSystemStaff,
  SmoSystemGroup, SmoSelector, dynamicCtorInit, SmoBeamer }
export const demo = { runner, Smo };
export default demo;
