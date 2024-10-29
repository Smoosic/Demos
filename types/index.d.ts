/// <reference types="qunit" />
import { runner } from './src/runner';
import { SuiApplication, SuiDom, SmoScore, IsPitchLetter, SmoMusic, SmoMeasure, SmoNote, SmoOrnament, SmoInstrument, SmoSystemStaff, SmoSystemGroup, SmoSelector, SmoBeamer, createAndDisplayDialog, SuiNoteMenu, SmoOperation, SmoToXml, XmlToSmo, SuiXhrLoader, MidiToSmo } from 'smoosic';
/**
 * Expose the Smoosic symbols we need in the demo programs, and add them to our
 * default namespace
 */
export declare const Smo: {
    SuiApplication: typeof SuiApplication;
    SuiDom: typeof SuiDom;
    SmoScore: typeof SmoScore;
    IsPitchLetter: typeof IsPitchLetter;
    SmoMusic: typeof SmoMusic;
    SmoMeasure: typeof SmoMeasure;
    SmoNote: typeof SmoNote;
    SmoOrnament: typeof SmoOrnament;
    SmoInstrument: typeof SmoInstrument;
    SmoSystemStaff: typeof SmoSystemStaff;
    SmoSystemGroup: typeof SmoSystemGroup;
    SmoSelector: typeof SmoSelector;
    dynamicCtorInit: () => void;
    SmoBeamer: typeof SmoBeamer;
    createAndDisplayDialog: typeof createAndDisplayDialog;
    SuiNoteMenu: typeof SuiNoteMenu;
    SuiMenuCustomizer: (fcn: import("smoosic").customizeMenuOptionsFcn, ctor: string) => void;
    SmoOperation: typeof SmoOperation;
    SmoToXml: typeof SmoToXml;
    XmlToSmo: typeof XmlToSmo;
    SuiXhrLoader: typeof SuiXhrLoader;
    MidiToSmo: typeof MidiToSmo;
    parseMidi: any;
};
export declare const demo: {
    runner: typeof runner;
    Smo: {
        SuiApplication: typeof SuiApplication;
        SuiDom: typeof SuiDom;
        SmoScore: typeof SmoScore;
        IsPitchLetter: typeof IsPitchLetter;
        SmoMusic: typeof SmoMusic;
        SmoMeasure: typeof SmoMeasure;
        SmoNote: typeof SmoNote;
        SmoOrnament: typeof SmoOrnament;
        SmoInstrument: typeof SmoInstrument;
        SmoSystemStaff: typeof SmoSystemStaff;
        SmoSystemGroup: typeof SmoSystemGroup;
        SmoSelector: typeof SmoSelector;
        dynamicCtorInit: () => void;
        SmoBeamer: typeof SmoBeamer;
        createAndDisplayDialog: typeof createAndDisplayDialog;
        SuiNoteMenu: typeof SuiNoteMenu;
        SuiMenuCustomizer: (fcn: import("smoosic").customizeMenuOptionsFcn, ctor: string) => void;
        SmoOperation: typeof SmoOperation;
        SmoToXml: typeof SmoToXml;
        XmlToSmo: typeof XmlToSmo;
        SuiXhrLoader: typeof SuiXhrLoader;
        MidiToSmo: typeof MidiToSmo;
        parseMidi: any;
    };
    QTest: QUnit.TestFunction;
    QModule: moduleFunc1 & moduleFunc2 & ModuleOnly & ModuleSkip & ModuleTodo;
    QStart: () => void;
};
export default demo;
//# sourceMappingURL=index.d.ts.map