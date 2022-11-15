import * as vscode from 'vscode';
import deep from 'lodash.clonedeep';

import { getPairs } from './pairs';

let decorations: { [key: string]: vscode.TextEditorDecorationType } = {};

const defaults = {
  borderColor: 'lime',
  borderStyle: 'none none dotted none',
  borderWidth: '1px',
  light: { borderColor: '#333333' }
};

export const setDecorations = (settings: vscode.WorkspaceConfiguration) => {
  const styles = {
    global: deep(settings.style),
    ...Object.keys(getPairs()).reduce((acc, id) => {
      const pair = getPairs()[id];
      if (pair && pair.style && typeof pair.style === 'object') {
        acc[id] = pair.style;
      }
      return acc;
    }, {} as any)
  };

  decorations = Object.keys(styles).reduce((prev, styleFor) => {
    const style = Object.assign(defaults, styles[styleFor]);

    prev[styleFor] = vscode.window.createTextEditorDecorationType(style);

    return prev;
  }, {} as Record<string, vscode.TextEditorDecorationType>);

  return decorations;
};

export const getDecorations = () => decorations;
