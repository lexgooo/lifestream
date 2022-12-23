import { Modal, App, Setting, DropdownComponent, TextComponent } from "obsidian";
import { TableColumn, Result } from "./config";
class LifestreamModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		// const {contentEl} = this;
		// contentEl.setText('Woah!');
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}
}

export class LogModal extends LifestreamModal {
	config: TableColumn[];
	result: Result = {};
	onSubmit: (result: Result)  => void;
	constructor(app: App, config: TableColumn[], onSubmit: (result: Result) => void) {
		super(app)
		this.config = config
		config.forEach(item => {
			this.result[item.key] = ''
		})
		this.onSubmit = onSubmit
	}

	onOpen() {
		const { contentEl } = this
		contentEl.createEl('h1', '你刚做了什么？')
		this.config?.forEach((item: TableColumn) => {
			const { key, title, type, regx, options } = item
			new Setting(contentEl)
				.setName(title)[type](comp => {
					if(comp instanceof DropdownComponent && options) {
						comp.addOptions(options)
						this.result[key] = comp.getValue()
					}
					if (comp instanceof TextComponent && key === 'spent') {
						// TODO 获取上一条数据的时间戳，用当前时间戳去减得出推荐时间
						comp.setPlaceholder('输入数字外的其他字符无效')
					}
					comp.onChange(value => {
							let res:string|number|boolean = value
							if (typeof value === 'string' && regx && !new RegExp(regx).test(value)) {
								res = ''
								// comp.setValue()
							}
							this.result[key] = res
						})
				})
		})
		new Setting(contentEl)
			.addButton(btn => btn
				.setButtonText('提交')
				.setCta()
				.onClick(() => {
					this.close()
					this.onSubmit(this.result)
				})
			)
		super.onOpen()
	}

	onClose(): void {
		super.onClose()
	}
}