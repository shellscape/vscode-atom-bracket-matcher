import * as vscode from 'vscode';
import deep from 'lodash.clonedeep';

import { getPairs } from './pairs';

let decorations: { [key: string]: vscode.TextEditorDecorationType } = {};

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

  // Build decorations
  decorations = Object.keys(styles).reduce((acc, styleFor) => {
    const style = styles[styleFor];
    // Add default borderColor if the style lacks it
    if (!style.hasOwnProperty('borderColor')) {
      style.borderColor = '#D4D4D4';
      style.light = { borderColor: '#333333' };
    }
    if (!style.hasOwnProperty('borderStyle')) {
      style.borderStyle = 'none none solid none';
    }
    if (!style.hasOwnProperty('borderWidth')) {
      style.borderWidth = '1px';
    }

    acc[styleFor] = vscode.window.createTextEditorDecorationType(style);
    return acc;
  }, {} as any);

  return decorations;
};

export const getDecorations = () => decorations;
