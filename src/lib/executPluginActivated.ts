import * as vscode from "vscode";
import { setContextWhenActive } from "../globalState";

export const init = (context: vscode.ExtensionContext) => {
  // 缓存 context 变量
  setContextWhenActive(context);
};
