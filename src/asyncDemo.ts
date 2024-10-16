import { Smo } from '../index';
import { SmoMode, PitchLetter } from 'smoosic';

function toPitchLetterAr(input: string): PitchLetter[] {
  const rv: PitchLetter[] = []; 
  input.split('').forEach((cc) =>  {
    if (Smo.IsPitchLetter(cc)) {
      rv.push(cc as PitchLetter);
    }
  });
  return rv;
}
/**
 * This demo shows how to create and update a score in real time, as you might do from a UI.
 * We programatically create selections and operate on those selections the way a user would
 */
export class asyncDemo {
  static async run() {
    // Create and start the view object.
    // The outer container DOM is for scrolling
    const app = await Smo.SuiApplication.configure({
      mode: 'library',
      idleRedrawTime: 1,
      demonPollTime: 1,
      initialScore: undefined,
      scoreDomContainer: 'outer-container',
    });
    const view = app.view;
    if (!view) { 
      throw('ouch');
    };
    // Smoosic stores the last quick save, create an empty score
    const score = Smo.SmoScore.getDefaultScore(Smo.SmoScore.defaults, null);
    score.preferences.autoPlay = false; // sounds kind of annoying for this demo
    const renderer = view.renderer;
    renderer.stepMode = true;

    // Convienence object that sends a command to the view object, and
    // returns a promise that is resolved when the change is rendered
    const t = ((action: () => void, repetition: number) => {
      return view.waitableAction(action, repetition);
    });
    // render the initial score (1 empty measure)
    await renderer.renderPromise();
    await view.changeScore(score);
    await renderer.renderPromise();

    // Select 1st 2 quarters and make them into 16ths by 1/2 their duration twice
    await view.growSelectionRight();
    await view.batchDurationOperation('halveDuration');
    await view.batchDurationOperation('halveDuration');
    await view.moveSelectionLeft();
    await view.moveSelectionRight();

    // Set some pitches.  Auto-advance moves the cursor to the left
    // SmoScore.preferences can toggle auto-advance and auto-play
    // setPitch sets the key-appropriate note for the given letter.
    await view.setPitchesPromise(toPitchLetterAr('cdefdec'));

    // Set the notes we just made down the octave by selecting them
    // Transpose works relative to the pitch and does not auto-advance
    await view.moveSelectionLeft();
    // same as await view.growSelectionLeft() 6 times...
    await t(() => view.growSelectionLeft(), 6);
    await view.transposeSelections(-12);

    // Create 4 1/8 note at end
    await view.moveSelectionRight();
    await view.growSelectionRight();
    await view.batchDurationOperation('halveDuration');
    await view.moveSelectionLeft();
    await view.moveSelectionRight();
    await view.setPitchesPromise(toPitchLetterAr('gcbc'));
    await view.moveSelectionLeft();
                 // Add a turn on the next tick
    await view.toggleArticulation('mordent_inverted', 'SmoOrnament');
    await view.moveSelectionRight();

    // Beam the 8th notes and the 16th notes
    await t(() => view.growSelectionLeft(), 3);
    await view.transposeSelections(12);
    await view.beamSelections();
    await view.moveSelectionLeft();
    await t(() => view.growSelectionLeft(), 3);
    await view.beamSelections();

    // Add measure after this one
    await view.addMeasure(true);
    await t(() => view.moveSelectionRight(), 5);
    await view.growSelectionRight();
    await t(() => view.batchDurationOperation('halveDuration'),  2);
    await view.moveSelectionLeft();
    await view.moveSelectionRight();
    await view.moveSelectionLeft();
    await view.moveSelectionRight();
    await view.setPitchesPromise(toPitchLetterAr('dgabcabg'));
    await view.growSelectionRight();
    await view.batchDurationOperation('halveDuration');
    await view.moveSelectionLeft();
    await view.moveSelectionRight();
    await view.setPitchesPromise(toPitchLetterAr('dgfg'));

    await view.moveSelectionLeft();
    // Add a turn on the next tick
    await view.toggleArticulation('mordent_inverted', 'SmoOrnament');
    await view.moveSelectionRight();
    await t(() => view.growSelectionLeft(), 3);
    await t(() => view.beamSelections(), 1);
    await view.moveSelectionLeft();
    await t(() => view.growSelectionLeft(), 6);
    await view.transposeSelections(-12);
    await view.moveSelectionLeftMeasure();
    // Add the bass cleff staff.  It automatically adds
    // all the measures
    await view.addStaffSimple({
      "instrumentName": "Bass Clef Staff",
      "keyOffset": 0,
      "clef": "bass"
    });
    await view.moveSelectionDown();
    await view.batchDurationOperation('doubleDuration');
    await view.moveSelectionRight();
    await view.growSelectionRight();
    await t(() => view.batchDurationOperation('halveDuration'), 2);
    await view.moveSelectionLeft();
    await t(() => view.moveSelectionRight(), 2);
    await view.setPitchesPromise(toPitchLetterAr('cdefdec'));
    await view.moveSelectionLeft();
    await t(() => view.growSelectionLeft(), 3);
    await view.beamSelections();
    await view.moveSelectionRight();
    await view.batchDurationOperation('halveDuration');
    await view.setPitchesPromise(toPitchLetterAr('g'));
    await t(() => view.moveSelectionLeft(), 3);
    await view.transposeSelections(12);
    await view.moveSelectionRight();
    await view.toggleArticulation('staccato','SmoArticulation');
    // select notes to slur
    await view.growSelectionLeft();
    // slur applies to selection
    await view.addSlur();
    await t(() => view.moveSelectionRight(), 2);
    await t(() => view.growSelectionRight(), 2);
    await t(() => view.batchDurationOperation('halveDuration'), 2);
    await view.moveSelectionLeft();
    await t(() => view.moveSelectionRight(), 2);
    await view.setPitchesPromise(toPitchLetterAr('gabcabg'));
    await t(() => view.growSelectionLeft(), 3);
    await view.beamSelections();

    // Add measure after this one.  Both staffs get the new measure
    // and it is populated with rests
    await view.addMeasure(true);
    await view.moveSelectionUp();
    await view.moveSelectionRightMeasure();
    await t(() => view.growSelectionRight(), 3);
    await t(() => view.batchDurationOperation('halveDuration'), 2);
    await view.moveSelectionLeft();
    await view.moveSelectionRight();
    await view.setPitchesPromise(toPitchLetterAr('eagfegfagfedcedf'));
    await view.moveSelectionDown();
    await t(() => view.growSelectionRight(), 3);
    await view.batchDurationOperation('halveDuration');
    await view.moveSelectionLeft();
    await view.moveSelectionRight();
    await view.setPitchesPromise(toPitchLetterAr('cbcdegab'));
    await t(() => view.growSelectionLeft(), 3);
    await view.beamSelections();

    await view.moveSelectionLeft();
    await t(() => view.growSelectionLeft(), 3);
    await view.beamSelections();
    await view.moveSelectionRight();
    await t(() => view.growSelectionLeft(), 3);
    await view.addSlur();
    await view.moveSelectionRight();
    await t(() => view.growSelectionRight(), 2);
    await view.addSlur();
    await view.transposeSelections(-12);
    // It's starting to get kind of crowded.  Set the svgScale to 60%
    // to make the notes smaller.
    await view.setGlobalLayout({
    pageWidth: 816,
    pageHeight: 1056,
    proportionality: 0,
    maxMeasureSystem: 0,
    svgScale: 0.6,
    zoomScale: 1.5,
    noteSpacing: 1,
  });    
  }
}