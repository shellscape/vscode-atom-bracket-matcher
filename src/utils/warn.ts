import * as vscode from 'vscode';

export const warn = (msg: string) => {
  vscode.window.showWarningMessage(msg);
};
