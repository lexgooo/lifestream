import { App, PluginSettingTab, Setting } from 'obsidian'
import LifestramPlugin from 'src/main';

export default class LifestreamSettingTab extends PluginSettingTab {
	plugin: LifestramPlugin;

	constructor(app: App, plugin: LifestramPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		containerEl.createEl('h2', {text: '生活日志插件设置'});
		// containerEl.createEl('h1', {text: '日志设置'});
		new Setting(containerEl)
			.setName('日志数据存储位置')
			.setDesc('生活日志源数据所在的文件路径')
			.addText(text => text
				.setPlaceholder('请输入你的日志数据文件路径')
				.setValue(this.plugin.settings.logPath)
				.onChange(async (value) => {
					this.plugin.settings.logPath = value;
					await this.plugin.saveSettings();
				}));
    new Setting(containerEl)
      .setName('账本数据存储位置')
      .setDesc('日常记账源数据所在的文件路径')
      .addText(text => text
        .setPlaceholder('请输入你的账本所在文件路径')
        .setValue(this.plugin.settings.accountBookPath)
        .onChange(async value => {
          this.plugin.settings.accountBookPath = value;
          await this.plugin.saveSettings();
        }));
		new Setting(containerEl)
			.setName('收集器数据存储位置')
			.setDesc('灵感，任务等杂项数据保存的路径')
			.addText(text => text
				.setPlaceholder('请输入收集器所在路径')
				.setValue(this.plugin.settings.inboxPath)
				.onChange(async value => {
					this.plugin.settings.logPath = value;
					await this.plugin.saveSettings();
				}));
	}
}