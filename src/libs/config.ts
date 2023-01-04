import { Command } from "obsidian";
import LifestreamPlugin from '../main';
import { generateLogInit, getContent, insertContent } from './libs'

export const CODE_BLOCK_NAME = 'lifestreamtable'
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
  setable: boolean,
	hide?: boolean,
	type?: FormElType,
	options?: Record<string, string>,
	regx?: RegxType,
}
export interface LifestreamPluginSettings {
	logPath: string;
  // logTableHeader: string;
	logTableHeader: TableColumn[],
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
	logPath: '/database/log.json',
	logTableHeader: [
    {
      key: 'date',
      title: '日期',
      setable: false,
    },
    {
      key: 'time',
      title: '时间',
      setable: false,
    },
		{
			key: 'tag',
			title: '标签',
      setable: true,
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
      setable: true,
			type: FormElType['输入框']
		},
		{
			key: 'desc',
			title: '描述',
      setable: true,
			type: FormElType['文本框']
		},
		{
			key: 'spent',
			title: '用时(min)',
      setable: false,
			type: FormElType['输入框'],
			regx: RegxType['只能是数字'],
		},
    {
      key: 'timestamp',
      title: '时间戳',
      setable: false,
			hide: true
    },
	],
  accountBookPath: '/database/accountBood.json',
  inboxPath: '/database/inbox.json'
}

export function generateCommands (self: LifestreamPlugin): Command[] {
  return [
    {
      id: 'lifestream-log-add-item',
      name: 'Lifestream 新增一条日志',
      callback: async () => {
        if (!self) return
        const { settings, app } = self
        const { vault } = app
        const { logPath, logTableHeader } = settings
				console.log(logTableHeader)
				debugger
        const folder = logPath.split('/')?.slice(0, -1).join('/')
        const res = await vault.exists(logPath)
			  // 初始化库文件
        if (!res) {
          const initRes = generateLogInit(logTableHeader)
          await vault.createFolder(folder)
          await vault.create(logPath, initRes)
        }
			  // const visible = this.activeDocument?.visibilityState === 'visible'
			  getContent(ContentType['日志'], app, logTableHeader, (res: Result) => {
				  insertContent(self, ContentType['日志'], res)
			  })
      },
    }
  ]
}