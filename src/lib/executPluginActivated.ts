import * as vscode from "vscode";
import { setContextWhenActive } from "../globalState";

export const init = (context: vscode.ExtensionContext) => {
  // įžå­ context åé
  setContextWhenActive(context);
};
