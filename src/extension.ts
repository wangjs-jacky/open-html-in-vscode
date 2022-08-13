// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { openHtmlInVscode } from "./command/openHtmlInVscode";
import { fastGitReset } from "./command/fastGitReset";
import { init } from "./lib/executPluginActivated";
import { onlineDocument } from "./panel/onlineDocumentPanel";

export function activate(context: vscode.ExtensionContext) {
  // 初始化
  init(context);

  context.subscriptions.push(onlineDocument);
  context.subscriptions.push(openHtmlInVscode);
  context.subscriptions.push(fastGitReset);

}

export function deactivate() { }
