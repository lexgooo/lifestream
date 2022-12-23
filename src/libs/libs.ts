import { Command, App } from "obsidian";
import dayjs from 'dayjs';
import LifestreamPlugin from "src/main";
import { ContentType, Result, TableColumn } from "./config";
import { LogModal } from "./Modals";
export function commandsRegister (commands: Command[]): void {
  if (!this) return
  commands.forEach(command => {
    this.addCommand(command) 
  });
}

function getLogContent(app:App, config: TableColumn[], cb: (res: Result) => void) {
  new LogModal(app, config, cb).open()
  // modal.onOpen()
}

export function getContent (type: ContentType, app: App, config: TableColumn[], cb: (res: Result) => void) {
  switch(type) {
    case ContentType['日志']:
      getLogContent(app, config, cb)
      break
    case ContentType['账本']:
      break
    case ContentType['消息']:
      break
  }
}

function insertLogContent (self: LifestreamPlugin, result: Result) {
  const { settings, app } = self
  const { vault } = app
  const { logPath, logTableHeaderConf } = settings
  console.log(vault, logPath, logTableHeaderConf)
  const path = logPath.split('/').slice(1).join('/')
  const file = vault?.fileMap?.[path]
  const now = dayjs()
  const timestamp = now.unix()
  const date = now.format('YYYY-MM-DD')
  const time = now.format('HH:mm')
  const data = `\n| ${date} | ${time} | ${logTableHeaderConf?.map(i => result[i.key]).join(' | ')} | ${timestamp} |`
  vault.append(file, data)
}

export function insertContent (self: LifestreamPlugin, type: ContentType, result: Result) {
  switch(type) {
    case ContentType['日志']:
      insertLogContent(self, result)
      break
    case ContentType['账本']:
      break
    case ContentType['消息']:
      break
  }
}