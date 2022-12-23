import { Plugin } from 'obsidian';
import LifestreamSettingTab from './libs/LifestreamSettingTab';
import { LifestreamPluginSettings, DEFAULT_SETTINGS, COMMANDS } from './libs/config';
import { commandsRegister } from './libs/libs';


export default class LifestramPlugin extends Plugin {
	settings: LifestreamPluginSettings;
	commandsRegister = commandsRegister

	async onload() {
		await this.loadSettings();

		this.commandsRegister(COMMANDS)

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new LifestreamSettingTab(this.app, this));
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
