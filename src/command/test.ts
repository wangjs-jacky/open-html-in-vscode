import * as vscode from "vscode";
import * as cp from "child_process";
import { relative, resolve } from "path";
import path = require("path");
const sh = require('shell-exec');
let rootPath = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath || "";
let _process: any;
let PORT = 3000;

//新增菜单 打开文档
export const test2 = vscode.commands.registerTextEditorCommand(
  "open-html-in-vscode.test2",
  async (params) => {
    // console.log(vscode.workspace.workspaceFolders?.[0].uri.fsPath);
    console.log("params", params);
    let filePath = params.document.uri.fsPath;
    if (await isHttpSeverExit()) {
      // vscode.window.showInformationMessage(filePath);
      let relativePath = path.relative(rootPath, filePath)
      startHttpServer(PORT, relativePath);

    } else {
      vscode.window.showInformationMessage("请先安装 http-server");
    }
  }
);

function isHttpSeverExit() {
  return new Promise((resolve, reject) => {
    cp.exec("http-server --version", (_err, stdout) => {
      if (_err) {
        reject(false)
      }
      resolve(/^v([0-9]{0,2})\.([0-9]{0,2})\.([0-9]{0,2})/.test(stdout))
    });
  })
}

async function startHttpServer(port: string | number, relativePath: string) {
  let pid = await isPortOccupied(port);
  if (!pid) {
    let _process = cp.exec(`http-server -p ${port}`, { cwd: rootPath });
    _process.stdout?.on("data", (data: any) => {
      if (!data) return;
      if (data.includes("Available on:")) {
        console.log("3000端口启动成功");
        vscode.commands.executeCommand("open-html-in-vscode.openweb", relativePath)
      }
    })
  } else {
    console.log(`${port}端口已被占用`);
    cp.exec(`kill -9 ${pid}`, (_err) => {
      if (!_err) {
        console.log(`释放${port}端口号成功`);
        startHttpServer(port, relativePath);
      }
    })
  }
}

function isPortOccupied(port: string | number) {
  return new Promise((resolve, reject) => {
    cp.exec(`lsof -i tcp:${port}`, { cwd: rootPath }, (_err, stdout) => {
      if (stdout.length > 0) {
        let regRex = new RegExp(/(?<=node\s+)[0-9]+/);
        let pid = stdout.match(regRex)?.[0]
        resolve(pid);
      } else {
        resolve(false);
      }
    })
  })
}