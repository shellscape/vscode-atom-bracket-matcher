import { IBrackets } from '../types';

import { getPairs } from './pairs';
import { Bracket } from './Bracket';

let brackets: IBrackets = {};

export const setBrackets = () => {
  brackets = Object.keys(getPairs()).reduce((acc, id) => {
    const pair = getPairs()[id];
    acc[pair.open] = new Bracket(id, true);
    acc[pair.close] = new Bracket(id, false);
    return acc;
  }, {} as any);
  return brackets;
};

export const getBrackets = () => brackets;
