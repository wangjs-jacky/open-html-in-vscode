// 使用模块实现共享变量
import * as vscode from "vscode";

export let context: vscode.ExtensionContext;

export const setContextWhenActive = (
  activeContext: vscode.ExtensionContext
) => {
  context = activeContext;
};
