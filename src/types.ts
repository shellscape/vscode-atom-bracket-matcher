import { Bracket } from './options/Bracket';

export interface IPair {
  close: string;
  open: string;
  parse?: boolean;
  style?: object;
}

export interface IPairs {
  [key: string]: IPair;
}

export interface IBrackets {
  [key: string]: Bracket;
}

export interface IOptions {
  brackets: IBrackets;
  parse: boolean;
  regexp: RegExp;
}

export interface IPrismMatch {
  str: string;
  type: string;
}

export interface IMatch {
  index: number;
  str: string;
}

export interface ILineMatch extends IMatch {
  line: number;
}

export interface IPairMatch {
  end?: ILineMatch;
  start: ILineMatch;
}
