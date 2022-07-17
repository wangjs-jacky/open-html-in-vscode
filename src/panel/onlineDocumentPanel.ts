import * as vscode from "vscode";
// import * as nls from "vscode-nls";
// import { generateHTMLByHttp } from "../lib/loadLocalHTML";
import { context } from "../globalState";
import { generateHTMLByHttp } from "../lib/loadLocalHTML";

export let onlineDocumentPanel: vscode.WebviewPanel | undefined;

//新增菜单 打开文档
export const onlineDocumentDisposable = vscode.commands.registerCommand(
  "open-html-in-vscode.openweb",
  (relativePath: any) => {
    console.log("params-2", relativePath);

    if (onlineDocumentPanel) {
      onlineDocumentPanel.reveal();
    } else {
      onlineDocumentPanel = vscode.window.createWebviewPanel(
        "webview_type",
        "Tabs Title",
        1, // 显示的 Col
        {
          enableScripts: true,
          retainContextWhenHidden: true,
        }
      );
    }
    onlineDocumentPanel.webview.html = generateHTMLByHttp(
      `http://127.0.0.1:3000/${relativePath}`
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
