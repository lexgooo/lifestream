import { TextFileView } from "obsidian";

export const VIEW_TYPE_TABLE_JSON = 'table-json-view'

export class TableJsonView extends TextFileView {
  getViewData () {
    return this.data;
  }

  setViewData (data: string, clear: boolean) {
    this.data = data;
    this.contentEl.empty();
    this.contentEl.createDiv({ text: this.data });
  }

  clear () {
    this.data = "";
  }

  getViewType () {
    return VIEW_TYPE_TABLE_JSON
  }
}