// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { test2 } from "./command/test";
import { init } from "./lib/executPluginActivated";
import { onlineDocumentDisposable } from "./panel/onlineDocumentPanel";

export function activate(context: vscode.ExtensionContext) {
  // 初始化
  init(context);

  context.subscriptions.push(onlineDocumentDisposable);
  context.subscriptions.push(test2);
  
}

export function deactivate() {}
