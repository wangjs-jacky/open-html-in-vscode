import * as vscode from "vscode";
import { isPortOccupied } from "./openHtmlInVscode";

export const releasePort = vscode.commands.registerCommand(
    "open-html-in-vscode.releasePort",
    () => {
        isPortOccupied(3000);
    }
);