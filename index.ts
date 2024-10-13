import { runner } from './src/runner';
import { SmoAudioPlayerSettings, 
  SuiApplication, SuiDom, SmoNamespace,   XmlToSmo,
  SmoToXml, MidiToSmo, SmoToMidi, SmoMusic, SmoAudioPitch,
  SmoMeasure, SmoSystemStaff, SmoNote, SmoStaffHairpin, StaffModifierBase,
  SmoStaffTextBracket, SmoInstrument, SmoSlur, SmoPedalMarking, SmoTie, SmoTabStave,
  SmoSystemGroup, SmoTextGroup,   SmoRehearsalMark, SmoMeasureFormat, SmoBarline, SmoRepeatSymbol,
  SmoVolta, SmoMeasureText, SmoTempoText, TimeSignature,   SmoOrnament,
  SmoArticulation, SmoDynamicText, SmoGraceNote, SmoMicrotone, SmoLyric, SmoArpeggio, SmoClefChange,
  CollapseRibbonControl, ExtendedCollapseParent, SuiButtonComponent,  SuiButtonComposite,
  SuiButtonArrayComponent, SuiButtonArrayMSComponent, CheckboxDropdownComponent, SuiDragText,
  SuiDropdownComponent, SuiDropdownComposite, SuiFileDownloadComponent, SuiFontComponent,
  SuiNoteTextComponent, SuiLyricComponent, SuiChordComponent, SuiPitchComponent, SuiPitchComposite,
  SuiRockerComponent, SuiRockerComposite, StaffAddRemoveComponent, StaffCheckComponent, TextCheckComponent,
  SuiTextInPlace, SuiTextBlockComponent, SuiTextInputComponent, SuiTextInputComposite, SuiReadOnlyTextComponent,
  TieMappingComponent, SuiToggleComponent, SuiToggleComposite, SuiTreeComponent,
  SuiHairpinAttributesDialog, SuiPedalMarkingDialog, SuiTieAttributesDialog, SuiSlurAttributesDialog, SuiDynamicModifierDialog,
  SuiVoltaAttributeDialog, SuiTextBlockDialog, SuiTextBracketDialog, SuiLyricDialog, SuiKeySignatureDialog, SuiPartSelectionMenu,
  SuiChordChangeDialog,SuiScoreFontDialog,SuiLanguageMenu, SuiScoreMenu, SuiKeySignatureMenu, SuiPrintFileDialog,
  SuiMeasureMenu, SuiTimeSignatureMenu, SuiFileMenu, SuiDynamicsMenu, SuiStaffModifierMenu, SuiPartMenu,
  SuiLoadMxmlDialog,SuiInsertMeasures, SuiGlobalLayoutDialog, SuiSaveXmlDialog, SuiSaveMidiDialog, SuiSaveFileDialog,
  SuiPartInfoDialog, SuiPageLayoutDialog, SuiMeasureDialog, SuiInstrumentDialog,   
  SuiTextMenu, SuiVoiceMenu, SuiBeamMenu, SuiScoreViewDialog, SuiStaffGroupDialog, SuiTempoDialog, SuiScoreIdentificationDialog,
  SuiScorePreferencesDialog, SuiNoteMenu, SuiGraceNoteDialog
} from 'smoosic';

/**
 * There are a lot of dynamic constructors in Smoosic, we need to import those symbols so the runtime can find them
 * when it needs to.  They are used when deserializing scores, and for some UI elements.
 * SmoNamespace.value contains the global namespace value for Smoosic used for dynamic constructors.  
 * Demo projects can change the Smo namespace to  match their default namespace.
 */
export const Smo = { SuiApplication, SuiDom, SmoAudioPlayerSettings, SmoNamespace,
  XmlToSmo,  SmoToXml,  MidiToSmo,  SmoToMidi,  SmoMusic,  SmoAudioPitch,  SmoMeasure, SmoSystemStaff,
  SmoNote, SmoStaffHairpin, StaffModifierBase,  SmoStaffTextBracket,
  SmoInstrument, SmoSlur, SmoPedalMarking, SmoTie, SmoTabStave,
  SmoSystemGroup, SmoTextGroup,   SmoRehearsalMark, SmoMeasureFormat, SmoBarline, SmoRepeatSymbol,
  SmoVolta, SmoMeasureText, SmoTempoText, TimeSignature, SmoOrnament,
  SmoArticulation, SmoDynamicText, SmoGraceNote, SmoMicrotone, SmoLyric, SmoArpeggio, SmoClefChange,
  CollapseRibbonControl, ExtendedCollapseParent, SuiButtonComponent,  SuiButtonComposite,
  SuiButtonArrayComponent, SuiButtonArrayMSComponent, CheckboxDropdownComponent, SuiDragText,
  SuiDropdownComponent, SuiDropdownComposite, SuiFileDownloadComponent, SuiFontComponent,
  SuiNoteTextComponent, SuiLyricComponent, SuiChordComponent, SuiPitchComponent, SuiPitchComposite,
  SuiRockerComponent, SuiRockerComposite, StaffAddRemoveComponent, StaffCheckComponent, TextCheckComponent,
  SuiTextInPlace, SuiTextBlockComponent, SuiTextInputComponent, SuiTextInputComposite, SuiReadOnlyTextComponent,
  TieMappingComponent, SuiToggleComponent, SuiToggleComposite, SuiTreeComponent,
  SuiHairpinAttributesDialog, SuiPedalMarkingDialog, SuiTieAttributesDialog, SuiSlurAttributesDialog, SuiDynamicModifierDialog,
  SuiVoltaAttributeDialog, SuiTextBlockDialog, SuiTextBracketDialog, SuiLyricDialog, SuiChordChangeDialog,
  SuiPrintFileDialog,  SuiLoadMxmlDialog,SuiInsertMeasures, SuiGlobalLayoutDialog, SuiSaveXmlDialog, SuiSaveMidiDialog, SuiSaveFileDialog,
  SuiPartInfoDialog, SuiPageLayoutDialog, SuiMeasureDialog, SuiInstrumentDialog, SuiScoreFontDialog,
  SuiKeySignatureDialog, SuiPartSelectionMenu, SuiLanguageMenu, SuiScoreMenu,
  SuiTextMenu, SuiVoiceMenu, SuiBeamMenu,
  SuiMeasureMenu, SuiTimeSignatureMenu, SuiFileMenu, SuiDynamicsMenu, SuiStaffModifierMenu, SuiPartMenu, SuiKeySignatureMenu,
  SuiScoreViewDialog, SuiStaffGroupDialog, SuiTempoDialog, SuiScoreIdentificationDialog,
  SuiScorePreferencesDialog, SuiNoteMenu, SuiGraceNoteDialog
 }
export const demo = { runner, Smo };
Smo.SmoNamespace.value = 'demo.Smo';
export default demo;
