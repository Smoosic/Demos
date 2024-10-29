import { Smo } from '../index';
import { SmoMode, SuiConfiguredMenuOption, SuiMenuBase,
  SuiDialogAdapterBase, SuiComponentAdapter, SuiScoreViewOperations, SuiDialogParams,
  DialogDefinition, SuiConfiguredMenu
 } from 'smoosic';
/**
 * This module demonstrates adding custom menus and dialogs dynamically.  This is just a demo,
 * you can look at actual dialogs to see how the functionality works.
 * 
 * This program adds an option to the 'note' menu called 'demo dialog'.
 */

/**
 * An adapter converts between the parameters of your dialog and the rendered score.  Accessor methods
 * are created for the components of your dialog.  The name of the accessors must match the SmoName
 * of the components.
 */
export class DemoDialogAdapter extends SuiComponentAdapter {
  isNote: boolean;
  constructor(view: SuiScoreViewOperations) {
    super(view);
    // Group the undo operations, so if the users cancels we can undo all.
    this.view.groupUndo(true);

    // Initialize the dialog values based on the current selections.  For the demo we 
    // only check the first selection.  There is always 1 selection;
    const noteType = this.view.tracker.selections[0].note?.noteType ?? 'n';
    this.isNote = noteType === 'n';
  }
  async cancel() {
    // This will revert the selections to the state they were in before the dialog was launched.
    this.view.undo();
  }
  async commit() {
    // Since we have modified the score when the value was changed, there is nothing to do here.
    return;
  }
  // This is the accesor used by the component to initialize the value.
  get demoFlag(): boolean {
    return this.isNote;
  }
  // This is called by the component when the value changes.
  set demoFlag(val: boolean) {
    this.isNote = val;
    const noteType = val ? 'n' : 'r';
    // There are 2 copies of the score at all times: the view score and the persisted score.
    // This view method will update the correct selections of both.  The view and persisted 
    // score may show different staves and so have different selector mappings
    this.view.modifyCurrentSelections('set note head', (score, selections) => {
      selections.forEach((selection) => {
        const note = selection.note;
        if (note) {
          note.noteType = noteType;
        }
      });
    });
  }
}
/**
 * Most dialogs just bind a set of components to an adapter.  This dialog creates the 
 * adapter we just defined, and components for the UI.
 */
export class DemoDialog extends SuiDialogAdapterBase<DemoDialogAdapter> {
  // These are the components of the dialog.  There is a toggle, and a non-interactive message component.
  // The smoName of the toggle matches the accessors in your adapter.
  static dialogElements: DialogDefinition =
  {
    label: 'Demo Dialog', elements: [
      {
        smoName: 'demoFlag', // must match instance name
        classes: 'hide-when-editing hide-when-moving',
        control: 'SuiToggleComponent',
        label: 'Toggle Note'
      }, {
        smoName: 'textMessage',
        control: 'SuiReadOnlyTextComponent',
        label: 'This is a demo dialog.  This element is just text for explanation',
        classes: 'hide-input'
      }
    ], staticText: []
  };
  constructor(parameters: SuiDialogParams) {
    const adapter = new DemoDialogAdapter(parameters.view);
    super(DemoDialog.dialogElements, { adapter, ...parameters});
    // These define some global behaviors of the dialog, e.g. the drag handle.  These are the most 
    // common options.  KEYBOARD_CAPTURE makes sure all key strokes go to the dialog and don't alter the score.
    this.displayOptions = ['BINDCOMPONENTS', 'DRAGGABLE', 'KEYBOARD_CAPTURE', 'MODIFIERPOS', 'HIDEREMOVE'];
  }
}

/**
 * We create a menu option for the existing 'note' menu. The handler handles the case
 * where the menu option is selected.  display is a boolean and can be overridden to 
 * conditionally display the option, depending on what is selected.  The menuChoice
 * field is how the menu option appears.
 */
const demoMenuOption: SuiConfiguredMenuOption = {
  handler: async (menu: SuiMenuBase) => {
    Smo.createAndDisplayDialog(DemoDialog, {
      view: menu.view,
      completeNotifier: menu.completeNotifier,
      startPromise: menu.closePromise,
      eventSource: menu.eventSource,
      tracker: menu.tracker,
      ctor: 'SuiArpeggioDialog',
      id: 'insert-dialog',
      modifier: null
    });
  }, display: (menu: SuiMenuBase) => true,
  menuChoice: {
    icon: '',
    text: 'Demo Menu Option',
    value: 'demoMenuIdentifier'
  }
}
/**
 * We have to get our option into the menu.  This function does that.  Note that we could also
 * remove other options here if we wanted.  This is called after the default menu options are 
 * defined.
 * @param menu 
 */
const addDemoMenuOption = (menu: SuiConfiguredMenu) => {
  // options are all the options supported by this menu.  items are the items we are displaying 
  // right now.  We want to make sure our item and option is added if it is not there.
  const existingOption = menu.menuOptions.find((mm) => mm.menuChoice.value === 'demoMenuIdentifier');
  const existingItem = menu.menuItems.find((mm) => mm.value === 'demoMenuIdentifier');
  // add 2nd to last (last is conventionally a cancel option)
  if (!existingOption) {
    menu.menuOptions.splice(-1, 0, demoMenuOption);
  }
  if (!existingItem) {
    menu.menuItems.splice(-1, 0, demoMenuOption.menuChoice);
  }
}
/**
 * This is exactly the code that we use to initialize the demo app, with the addition that
 * we are adding our custom menu option to the SuiNoteMenu.
 */
export class customMenuApp {
  static run() {
    // Create the DOM scaffolding
    const dom = document.getElementById('smoo');    
    if (!dom) {
      throw('No element for Smoosic!');
    }
    Smo.SuiDom.createUiDom(dom);
    const mode: SmoMode = 'application';
    const config = { mode };
    Smo.SuiApplication.configure(config);
    Smo.SuiMenuCustomizer(addDemoMenuOption, 'SuiNoteMenu');
  }
}

