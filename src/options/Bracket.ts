import * as vscode from 'vscode';

import { getPairs } from './pairs';
import { getDecorations } from './decorations';

export class Bracket {
  public str: string;
  public opposite: string;
  public type: string;
  public parse: boolean;
  constructor(private pairId: string, open: boolean) {
    const pair = getPairs()[pairId];
    this.type = open ? 'open' : 'close';
    this.str = (pair as any)[this.type];
    this.opposite = pair[open ? 'close' : 'open'];
    // tslint:disable-next-line
    this.parse = !!(pair.parse || typeof (pair as any).parse === 'undefined');
  }
  get decoration(): vscode.TextEditorDecorationType {
    return getDecorations()[this.pairId] || getDecorations().global;
  }
}
