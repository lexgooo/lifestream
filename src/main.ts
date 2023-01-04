import { Command, Plugin, WorkspaceLeaf } from 'obsidian';
import LifestreamSettingTab from './libs/LifestreamSettingTab';
import { LifestreamPluginSettings, DEFAULT_SETTINGS, generateCommands } from './libs/config';
import { commandsRegister, codeBlockRegister } from './libs/libs';
import { TableJsonView, VIEW_TYPE_TABLE_JSON } from './libs/view';

export default class LifestreamPlugin extends Plugin {
	settings: LifestreamPluginSettings;
	commandsRegister = commandsRegister
  codeBlockRegister = codeBlockRegister

	async onload() {
		await this.loadSettings();
    const commands: Command[] = generateCommands(this)
		this.commandsRegister(commands)
    this.codeBlockRegister()

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new LifestreamSettingTab(this.app, this));
		
		// 注册json转表格的视图
		this.registerView(
			VIEW_TYPE_TABLE_JSON,
			(leaf: WorkspaceLeaf) => new TableJsonView(leaf)
		)
		this.registerExtensions(['json'], VIEW_TYPE_TABLE_JSON)
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
