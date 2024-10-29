import { runner } from './src/runner';
import { SuiApplication, SuiDom, SmoScore, IsPitchLetter, 
  SmoMusic, SmoMeasure, SmoNote, SmoOrnament, SmoInstrument, SmoSystemStaff,
  SmoSystemGroup, SmoSelector, dynamicCtorInit, SmoBeamer, 
  createAndDisplayDialog, SuiNoteMenu, SuiMenuCustomizer, SmoOperation,
  SmoToXml, XmlToSmo, SuiXhrLoader, MidiToSmo, parseMidi } from 'smoosic';
  import { test as QTest, module as QModule, start as QStart } from 'qunit';  
/**
 * Expose the Smoosic symbols we need in the demo programs, and add them to our 
 * default namespace
 */
export const Smo = { SuiApplication, SuiDom, SmoScore, IsPitchLetter, 
  SmoMusic, SmoMeasure, SmoNote, SmoOrnament, SmoInstrument, SmoSystemStaff,
  SmoSystemGroup, SmoSelector, dynamicCtorInit, SmoBeamer, createAndDisplayDialog,
  SuiNoteMenu, SuiMenuCustomizer, SmoOperation, 
  SmoToXml, XmlToSmo, SuiXhrLoader, MidiToSmo, parseMidi
   }
export const demo = { runner, Smo, QTest, QModule, QStart };
export default demo;
