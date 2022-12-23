import { Command } from "obsidian";
import LifestreamPlugin from '../main';
import { getContent, insertContent } from './libs'

export enum FormElType {
	输入框 = 'addText',
	文本框 = 'addTextArea',
	下拉框 = 'addDropdown',
	开关 = 'addToggle',
}

export enum RegxType {
	只能是数字 = '\\d+'
}
export interface TableColumn {
	key: string,
	title: string,
	type: FormElType,
	options?: Record<string, string>,
	regx?: RegxType,
}
export interface LifestreamPluginSettings {
	logPath: string;
  // logTableHeader: string;
	logTableHeaderConf: TableColumn[],
  accountBookPath: string;
  inboxPath: string;
}

export interface Result {
	[propName: string]: string | number | boolean
}

export enum ContentType {
	日志 = 'log',
	账本 = 'accountBook',
	消息 = 'message'
}

export const DEFAULT_SETTINGS: LifestreamPluginSettings = {
	logPath: '/database/log.md',
	logTableHeaderConf: [
		{
			key: 'tag',
			title: '标签',
			type: FormElType['下拉框'],
			options: {
				'工作': '工作',
				'提升': '提升',
				'生活': '生活',
				'娱乐': '娱乐',
				'其他': '其他'
			}
		},
		{
			key: 'title',
			title: '标题',
			type: FormElType['输入框']
		},
		{
			key: 'desc',
			title: '描述',
			type: FormElType['文本框']
		},
		{
			key: 'spent',
			title: '用时(min)',
			type: FormElType['输入框'],
			regx: RegxType['只能是数字'],
		}
	],
  accountBookPath: '/database/accountBood.md',
  inboxPath: '/database/inbox.md'
}

export function generateCommands (self: LifestreamPlugin): Command[] {
  return [
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
	},
  {
    id: 'lifestream-log-add-item',
    name: 'Lifestream 新增一条日志',
    callback: async () => {
      if (!self) return
      const { settings, app } = self
      const { vault } = app
      const { logPath, logTableHeaderConf } = settings
      const folder = logPath.split('/')?.slice(0, -1).join('/')
      const res = await vault.exists(logPath)
			// 初始化库文件
      if (!res) {
				const len = logTableHeaderConf.length || 0
				const logTableHeader = `| 日期 | 时间 | ${logTableHeaderConf?.map(item => item.title)?.join(' |')} | 时间戳 | \n| --- | --- | ${new Array(len)?.fill(' --- |')?.join('')} --- |`
        await vault.createFolder(folder)
        await vault.create(logPath, logTableHeader)
      }
			// const visible = this.activeDocument?.visibilityState === 'visible'
			getContent(ContentType['日志'], app, logTableHeaderConf, (res: Result) => {
				insertContent(self, ContentType['日志'], res)
			})
    },
  }
]
}