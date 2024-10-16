import { Smo } from '../index';
import { SmoVoice, SmoInstrumentParams, dynamicCtorInit } from 'smoosic';
/**
 * This demo shows how to create and update a score in real time, as you might do from a UI.
 * We programatically create selections and operate on those selections the way a user would
 */
export class syncDemo {
  static async run() {
    // @@@@@@
      // A simple music program using Smoosic in library mode.  We add the music 
      // to the score by creating SMO objects directly.  Since we are not using async mode,
      // we need to create our own selections, since tracker will not be aware of music changes
      // made before the item renders.

      // Since we are creating the score before the application, we need to initialize the environment
      // TODO: this feels a little hacky, but is needed to expose the dynamic constructors
      Smo.SuiApplication.initSync();
      // convienience function to create a SmoNote from letter name 
      // (smoosic pitches are json tuples: letter, accidental, octave).
      const notesFromLetters = Smo.SmoMusic.notesFromLetters;

      // Create an empty score.  'Empty' score actually has a single treble-clef measure of rests.
      const score = Smo.SmoScore.getDefaultScore(Smo.SmoScore.defaults, null);

      // create a new measure - we are going to replace the default measure with it.
      // Most SMO objects have defaults that you can use to construct a generic version
      let measure = new Smo.SmoMeasure(Smo.SmoMeasure.defaults);
      // create an empty voice
      let voice: SmoVoice = { notes: [] };
      // populate the first 8 16th notes
      notesFromLetters(Smo.SmoMeasure.defaultPitchForClef['treble'], 'treble', 'c', 1024, 'ccdefdec')
        .forEach((note) => {
        note.pitches[0].octave -= 1; // adjust octave
        voice.notes.push(note);
      });
      // first note is a rest
      voice.notes[0].noteType = 'r';

      // create next 4 1/8 notes
      notesFromLetters(Smo.SmoMeasure.defaultPitchForClef['treble'], 'treble', 'c', 2048, 'gcbc').forEach((note) => {
        note.beamBeats = 4096 * 2; // beam 4 1/8 notes, default is 2
        voice.notes.push(note);
      });
      // adjust the beams the way we want it.
      voice.notes[3].endBeam = true;

      // You would not want to do this in an interactive app, because the tracker and UI don't won't know about the new voice 
      // until it's been rendered.  But since we're doing this all without rendering the score, it's OK.
      measure.voices[0] = voice;

      // Add ornament to the note.  A common pattern is to create the defaults object and make changes to it
      // for your object
      const orn1 = Smo.SmoOrnament.defaults;
      orn1.ornament = Smo.SmoOrnament.ornaments.downmordent;
      voice.notes[10].toggleOrnament(new Smo.SmoOrnament(orn1));
      score.staves[0].measures = [measure];

      // Now create the second line.  The default instrument is a generic treble clef instrument.
      // we want bass clef, 
      // so we need to create an instrument and add it to the staves' constructor parameters.
      const instDefs = Smo.SmoInstrument.defaults;
      instDefs.clef = 'bass';
      const instMap: Record<number, SmoInstrumentParams> = {};
      // map measure '0' to this instrument, which is currently the only measure we have
      instMap[0] = instDefs;
      // Use the defaults, but add the bass clef instrument to the constructor parameters
      const staveDefs = Smo.SmoSystemStaff.defaults;
      staveDefs.measureInstrumentMap = instMap;
      score.addStaff(staveDefs);

      // now fill in the notes for the second stave.
      voice = { notes: [] };
      notesFromLetters(Smo.SmoMeasure.defaultPitchForClef['bass'], 'bass', 'c', 4096*2, 'd').forEach((note) => voice.notes.push(note));
      voice.notes[0].noteType = 'r';
      notesFromLetters(Smo.SmoMeasure.defaultPitchForClef['bass'], 'bass', 'c', 1024, 'ccdefdec').forEach((note) => voice.notes.push(note));
      voice.notes[1].noteType = 'r';
      voice.notes[4].endBeam = true;

      // Add the notes to the measure we just created.
      score.staves[1].measures[0].voices = [voice];

      // create a staff group with both staves, so the notes are justified
      const systemParams = Smo.SmoSystemGroup.defaults;

      // A selector is a single point in the music (a 'tickable').  We set the 
      // staff group over a selection, which includes all of the measures.
      const endSelector = Smo.SmoSelector.default;
      endSelector.staff = 1;
      // Default selector is the first note of the first stave, so we don't 
      // need to set it.
      systemParams.leftConnector = Smo.SmoSystemGroup.connectorTypes.brace;
      systemParams.rightConnector = Smo.SmoSystemGroup.connectorTypes.single;
      systemParams.endSelector = endSelector;
      score.addOrReplaceSystemGroup(new Smo.SmoSystemGroup(systemParams));

      // measure 2:
      score.addMeasure(1);  // this adds a measure to all staves in the score.
      voice = { notes: [] };
      notesFromLetters(Smo.SmoMeasure.defaultPitchForClef['treble'], 'treble', 'c', 1024, 'dgabcabg').forEach((note) => voice.notes.push(note));
      for (var i = 1; i <= 7; ++i) {
        voice.notes[i].pitches[0].octave -= 1;
      }
      notesFromLetters(Smo.SmoMeasure.defaultPitchForClef['treble'], 'treble', 'c', 2048, 'dgfg')
        .forEach((note) => {
          note.beamBeats = 4096 * 2;
          voice.notes.push(note);
        });
      voice.notes[10].toggleOrnament(new Smo.SmoOrnament(orn1));
      score.staves[0].measures[1].voices = [voice];

      voice = { notes: [] };
      notesFromLetters(Smo.SmoMeasure.defaultPitchForClef['treble'], 'treble', 'c', 2048, 'gg').forEach((note) => voice.notes.push(note));
      notesFromLetters(Smo.SmoMeasure.defaultPitchForClef['bass'], 'bass', 'c', 4096, 'd').forEach((note) => voice.notes.push(note));
      notesFromLetters(Smo.SmoMeasure.defaultPitchForClef['bass'], 'bass', 'c', 1024, 'ggabcabg').forEach((note) => voice.notes.push(note));
      voice.notes[0].pitches[0].octave += 1;
      // we use noteType to indicate a rest.  The pitch is still used to place the rest.
      voice.notes[2].noteType = 'r';
      voice.notes[3].noteType = 'r';
      voice.notes[6].endBeam = true;
      score.staves[1].measures[1].voices = [voice];

      // scale so it fits within a pen
      if (!score.layoutManager) {
        throw('ouch');
      }
      score.layoutManager.globalLayout.svgScale = 0.55;
      Smo.SuiApplication.configure({
        mode: 'library',
        initialScore: score,
        scoreDomContainer: 'outer-container'
      });
  }
}