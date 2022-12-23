import { Command } from "obsidian";
export function commandsRegister (commands: Command[]): void {
  if (!this) return
  commands.forEach(command => {
    this.addCommand(command) 
  });
}