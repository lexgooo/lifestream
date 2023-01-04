import { TextFileView } from "obsidian";
import { TableColumn, Result } from "./config";

export const VIEW_TYPE_TABLE_JSON = 'table-json-view'

export class TableJsonView extends TextFileView {
  tableColumns: TableColumn[]
  tableData: Result[]

  tableEl: HTMLElement

  getViewData () {
    return JSON.stringify({
      columns: this.tableColumns,
      data: this.tableData
    })
  }

  setViewData (res: string, clear: boolean) {
    this.data = res;
    const { columns, data } = JSON.parse(res)
    if (!(Array.isArray(columns) && Array.isArray(data))) {
      // TODO 渲染为 json 格式化显示文件
      return
    }
    this.tableColumns = columns
    this.tableData = data
    this.refresh()
  }

  clear () {
    this.tableColumns = [];
    this.tableData = [];
  }

  getViewType () {
    return VIEW_TYPE_TABLE_JSON
  }

  async onOpen () {
    const boxEl = this.contentEl.createDiv({ cls: 'markdown-rendered' })
    this.tableEl = boxEl.createEl('table');
  }

  async onClose () {
    this.contentEl.empty();
  }

  refresh () {
    this.tableEl.empty();

    const headEl = this.tableEl.createEl('thead')
    const bodyEl = this.tableEl.createEl('tbody')

    const headTr = headEl.createEl('tr')
    this.tableColumns.forEach((column, i) => {
      const { hide, title } = column
      if (hide) return
      headTr.createEl('th', { text: title })
    })

    this.tableData.forEach((item, i) => {
      const tr = bodyEl.createEl('tr')
      this.tableColumns.forEach((column, i) => {
        const { hide, key } = column
        if (hide) return
        if (!Object.keys(item).includes(key)) return
        tr.createEl('td', { text: item[key]+'' })
      })
    })
  }
}