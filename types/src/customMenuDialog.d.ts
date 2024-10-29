import { SuiDialogAdapterBase, SuiComponentAdapter, SuiScoreViewOperations, SuiDialogParams, DialogDefinition } from 'smoosic';
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
export declare class DemoDialogAdapter extends SuiComponentAdapter {
    isNote: boolean;
    constructor(view: SuiScoreViewOperations);
    cancel(): Promise<void>;
    commit(): Promise<void>;
    get demoFlag(): boolean;
    set demoFlag(val: boolean);
}
/**
 * Most dialogs just bind a set of components to an adapter.  This dialog creates the
 * adapter we just defined, and components for the UI.
 */
export declare class DemoDialog extends SuiDialogAdapterBase<DemoDialogAdapter> {
    static dialogElements: DialogDefinition;
    constructor(parameters: SuiDialogParams);
}
/**
 * This is exactly the code that we use to initialize the demo app, with the addition that
 * we are adding our custom menu option to the SuiNoteMenu.
 */
export declare class customMenuApp {
    static run(): void;
}
//# sourceMappingURL=customMenuDialog.d.ts.map