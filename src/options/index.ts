import * as vscode from 'vscode';

import { IOptions } from '../types';

import { setPairs } from './pairs';
import { getBrackets, setBrackets } from './brackets';
import { setDecorations } from './decorations';

let options: IOptions;

export const setOptions = (settings: vscode.WorkspaceConfiguration): IOptions => {
  // Pairs must be set/parsed first
  setPairs(settings);
  // We can now parse decorations and brackets
  setDecorations(settings);
  setBrackets();

  // Regexp
  // Sort them by length (longer will be checked for first)
  const sorted = Object.keys(getBrackets()).sort((a, b) => b.length - a.length);
  // Build regexp
  const escape = (s: string) => s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  const regexp = new RegExp(`(${sorted.map(escape).join('|')})`, 'g');

  options = {
    brackets: getBrackets(),
    regexp,
    parse: settings.parse
  };

  return options;
};

export const getOptions = () => options;
