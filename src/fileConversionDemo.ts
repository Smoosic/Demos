import { Smo } from '../index';
import { SmoMode, SuiApplication, SmoScore } from 'smoosic';

declare var $: any;
/**
 * This demo loads some files and converts between midi, musicxml and smo.
 */
export class fileConversionApp {
  static jsonPath = 'https://smoosic.github.io/Smoosic/release/library/hymns/Precious Lord.json';
  static midiTiesPath = 'https://smoosic.github.io/Smoosic/release/library/miditest/ties.mid';
  static midiTripletPath = 'https://smoosic.github.io/Smoosic/release/library/miditest/triplet.mid';
  static midiKeyPath = 'https://smoosic.github.io/Smoosic/release/library/miditest/keytime.mid';
  static async run() {
    // Create the DOM scaffolding
    const dom = document.getElementById('smoo');    
    if (!dom) {
      throw('No element for Smoosic!');
    }
    Smo.SuiDom.createUiDom(dom);
    const mode: SmoMode = 'application';
    const config = { mode };
    const application = await Smo.SuiApplication.configure(config);
    await fileConversionApp.tester(application);
  }
  static async tester(application: SuiApplication) {
    const view = application.view!;
    QUnit.module('load', (hooks) => {
      hooks.before(async () => {
        await view.loadRemoteScore(fileConversionApp.jsonPath);
        await view.renderPromise();    
      });
      QUnit.test('load', assert => {
        assert.equal(view.score.staves[0].measures.length, 17);
        assert.equal($('#boo .vf-annotation').length, 82);
      });
    });
    QUnit.module('convert xml', (hooks) => {
      hooks.before(async () => {
        await view.loadRemoteScore(fileConversionApp.jsonPath);
        await view.renderPromise();    
        const xml = Smo.SmoToXml.convert(view.score);
        const newScore = Smo.XmlToSmo.convert(xml);
        await view.changeScore(newScore);  
      });
      QUnit.test('load converted Xml', assert => {
        assert.equal(view.score.staves[0].measures.length, 17);
        assert.equal($('#boo .vf-annotation').length, 82);
      });  
    });
    QUnit.module('convert midi', (hooks) => {
      let midiData = new Smo.SuiXhrLoader(fileConversionApp.midiTiesPath);
      let midiScore: SmoScore | null = null;
      hooks.before(async() => {
        await midiData.loadAsync();
        midiScore = (new Smo.MidiToSmo(Smo.parseMidi(midiData.value), 1024)).convert();
        await view.changeScore(midiScore);    
      });
      QUnit.test('loadMidi1', assert => {
        assert.notEqual(midiScore, null);
        if (midiScore) {
          assert.equal(midiScore.staves[0].getTiesEndingAt({ staff: 0, measure: 1, voice: 0, tick: 0, pitches: [] }).length, 1);
        }
      });
    });
    QUnit.module('load midi key signature', (hooks) => {
      const midiData = new Smo.SuiXhrLoader(fileConversionApp.midiKeyPath);
      let midiScore: SmoScore | null = null;
      hooks.before(async() => {
        await midiData.loadAsync();
        midiScore = (new Smo.MidiToSmo(Smo.parseMidi(midiData.value), 1024)).convert();
        await view.changeScore(midiScore);  
      });
      QUnit.test('loadMidi2', assert => {
        assert.notEqual(midiScore, null);
        if (midiScore) {
          assert.equal(midiScore.staves.length, 2);
          assert.equal(midiScore.staves[0].measures[0].keySignature, 'eb');
        }
      });
    });
    QUnit.module('load midi tuplet', (hooks) => {
      const midiData = new Smo.SuiXhrLoader(fileConversionApp.midiTripletPath);
      let midiScore: SmoScore | null = null;
      hooks.before(async() => {
        await midiData.loadAsync();
        midiScore = (new Smo.MidiToSmo(Smo.parseMidi(midiData.value), 1024)).convert();
        await view.changeScore(midiScore);  
      });
      QUnit.test('loadMidi3', assert => {
        assert.notEqual(midiScore, null);
        if (midiScore) {
          assert.equal(midiScore.staves[0].measures[0].tupletTrees.length, 1);
        }
      });
    });
    QUnit.start();
  }
}
