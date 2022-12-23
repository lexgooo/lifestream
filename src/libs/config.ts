import { Command } from "obsidian";

export interface LifestreamPluginSettings {
	logPath: string;
  accountBookPath: string;
  inboxPath: string;
}

export const DEFAULT_SETTINGS: LifestreamPluginSettings = {
	logPath: '/database/log.md',
  accountBookPath: '/database/accountBood.md',
  inboxPath: '/database/inbox.md'
}

export const COMMANDS: Command[] = [
  {
		// This adds a simple command that can be triggered anywhere
		id: 'open-sample-modal-simple',
		name: 'Open sample modal (simple)',
		callback: () => {
			// new SampleModal(this.app).open();
		}
	},
  {
		// This adds an editor command that can perform some operation on the current editor instance
		id: 'sample-editor-command',
		name: 'Sample editor command',
		// editorCallback: (editor: Editor, view: MarkdownView) => {
		// 	console.log(editor.getSelection());
		// 	editor.replaceSelection('Sample Editor Command');
		// }
	},
  {
		// This adds a complex command that can check whether the current state of the app allows execution of the command
		id: 'open-sample-modal-complex',
		name: 'Open sample modal (complex)',
		checkCallback: (checking: boolean) => {
			// Conditions to check
		// 	const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
		// 	if (markdownView) {
		// 		// If checking is true, we're simply "checking" if the command can be run.
		// 		// If checking is false, then we want to actually perform the operation.
		// 		if (!checking) {
		// 			new SampleModal(this.app).open();
		// 		}

		// 		// This command will only show up in Command Palette when the check function returns true
		// 		return true;
		// 	}
		}
	}
]