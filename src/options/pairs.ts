import * as vscode from 'vscode';
import { v4 as uuid } from 'uuid';

import deep from 'lodash.clonedeep';

import { warn } from '../utils/warn';
import { IPairs } from '../types';

let pairs: IPairs = {};

export const setPairs = (settings: vscode.WorkspaceConfiguration): IPairs => {
  const defArr: string[] = [];
  pairs = settings.pairs.reduce((acc: any, pair: any) => {
    if (!pair.open || !pair.close) {
      warn(`Each bracket pair must have an "open" and "close" key. Otherwise they'll be ignored.`);
      return acc;
    }
    if (
      pair.open === pair.close ||
      defArr.indexOf(pair.open) !== -1 ||
      defArr.indexOf(pair.close) !== -1
    ) {
      warn(
        `Opening and closing clauses for bracket pairs must be unique. Otherwise they'll be ignored.`
      );
      return acc;
    }

    // Avoid duplicates
    defArr.push(pair.open);
    defArr.push(pair.close);

    // Generate id and save pair settings
    acc[uuid()] = deep(pair);
    return acc;
  }, {} as any);
  return pairs;
};

export const getPairs = (): IPairs => pairs;
