import * as vscode from "vscode";
let terminal: vscode.Terminal

export const fastGitReset = vscode.commands.registerCommand(
    "open-html-in-vscode.fastGitReset",
    () => {
        if (vscode.window.activeTerminal) {
            terminal = vscode.window.activeTerminal;
        } else {
            terminal = vscode.window.createTerminal("reset hard");
        }
        vscode.env.clipboard.readText().then(res => {
            terminal.sendText(`git reset --hard ${res}`);
        })
    }
);