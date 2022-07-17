import * as vscode from "vscode";
import { PORT } from "../command/test";
import { context } from "../globalState";
import { generateHTMLByHttp } from "../lib/loadLocalHTML";

export let onlineDocumentPanel: vscode.WebviewPanel | undefined;

//新增菜单 打开文档
export const onlineDocumentDisposable = vscode.commands.registerCommand(
  "open-html-in-vscode.openweb",
  (relativePath: any) => {
    if (onlineDocumentPanel) {
      onlineDocumentPanel.webview.postMessage({
        command: "reload"
      });
      onlineDocumentPanel.reveal();
    } else {
      onlineDocumentPanel = vscode.window.createWebviewPanel(
        "webview_type",
        "Tabs Title",
        vscode.ViewColumn.Two,
        {
          enableScripts: true,
          retainContextWhenHidden: true,
        }
      );
    }
    onlineDocumentPanel.webview.html = generateHTMLByHttp(
      `http://127.0.0.1:${PORT}/${relativePath}`
    );

    // 关闭时，销毁 onlineDocumentPanel 变量
    onlineDocumentPanel.onDidDispose(
      () => {
        onlineDocumentPanel = undefined;
      },
      null,
      context.subscriptions
    );
  }
);
