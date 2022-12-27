import fs from 'fs'
import { ReadLine } from "readline";
import { Command, App } from "obsidian";
import dayjs from 'dayjs';
import LifestreamPlugin from "src/main";
import { CODE_BLOCK_NAME, ContentType, Result, TableColumn } from "./config";
import { LogModal } from "./Modals";
export function commandsRegister (commands: Command[]): void {
  if (!this) return
  commands.forEach(command => {
    this.addCommand(command) 
  });
}

// 注册代码块生成表格
export function codeBlockRegister () {
  this.registerMarkdownCodeBlockProcessor(CODE_BLOCK_NAME, (source, el) => {
    // console.log(source, el, ctx)
    // TODO 添加一个数据查询的和 dataview 差不多的功能
    source = source ? JSON.parse(source) : {}
    const { columns, data } = source
    const table=el.createEl('table')
    const thead = table.createEl('thead')
    const tbody = table.createEl('tbody')
    const headRow = thead.createEl('tr')
    if (Array.isArray(columns) && columns?.length) {
      columns.forEach(c => {
        headRow.createEl('th', { text: c.title })
      })
    }
    if (Array.isArray(data) && data?.length) {
      data.forEach(d => {
        const bodyRow = tbody.createEl('tr')
        columns.forEach(column => {
          bodyRow.createEl('td', { text: d[column?.key] })
        });
      })
    }
  })
}


// 生成初始数据模板
export function generateLogInit (header: TableColumn[]): string {
  return JSON.stringify({columns: header, data: []})
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
  const { logPath, logTableHeader } = settings
  const path = `${vault?.adapter?.basePath}${logPath}`
  const now = dayjs()
  const timestamp = now.unix()
  const date = now.format('YYYY-MM-DD')
  const time = now.format('HH:mm')
  result = {
    date,
    time,
    ...result,
    timestamp
  }
  const { data } = require(path)
  data.push(result)
  // TODO 不能修改原始文件
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