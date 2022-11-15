import * as prism from 'prismjs';
import loadLangs from 'prismjs/components/index';

import { IPrismMatch } from '../types';

import { getOptions } from '../options';
import { config } from '../config';
import { logger } from '../utils/logger';

import { matchAll } from './match-all';

// Initialize Prism languages
let languagesLoad = false;
function loadLanguages() {
  if (languagesLoad) return;

  logger.info('prismjs loadLanguages()');
  languagesLoad = true;
  loadLangs();
}

export class PrismParser {
  public parsed: IPrismMatch[][];
  public matches: IPrismMatch[][];
  private language: string;
  private strategies: { [key: string]: string[] } = {
    global: ['punctuation', 'interpolation-punctuation', 'delimiter', 'none'],
    markup: ['attr-name', 'none'],
    powershell: ['namespace', 'none']
  };
  constructor(private text: string, language: string, lines: number) {
    logger.debug('begin: new PrismParser()');
    const endLogger = () => logger.debug('end: new PrismParser()');

    this.parsed = [];
    this.matches = [];
    this.language = this.getLanguageId(language);
    if (lines > config.maxPrismLines || !getOptions().parse) {
      return endLogger() as any;
    }

    // Parse
    loadLanguages();
    logger.debug('run: PrismParser.tokenize()');
    const tokenized = this.tokenize();
    if (!tokenized) return endLogger() as any;

    logger.debug('run: PrismParser.parse()');
    const parsed = this.parse(tokenized);
    this.parsed = parsed.parsed;
    this.matches = parsed.matches;

    return endLogger() as any;
  }
  public get strategy(): string[] {
    return this.strategies.hasOwnProperty(this.language)
      ? this.strategies[this.language]
      : this.strategies.global;
  }
  private tokenize(): any[] | void {
    if (!this.language) return;
    const grammar = prism.languages[this.language];
    if (!grammar) return;

    try {
      return prism.tokenize(this.text, grammar);
    } catch (err) {
      // tslint:disable-next-line
      logger.warn(err);
    }
  }
  private parse(tokenized: any): { matches: IPrismMatch[][]; parsed: IPrismMatch[][] } {
    function perLine(tokens: any) {
      if (Array.isArray(tokens)) return tokens.forEach(perLine);
      if (typeof tokens === 'string') return forStrings(tokens, 'none');
      if (tokens.content) {
        if (typeof tokens.content === 'string') {
          return forStrings(tokens.content, tokens.type);
        }
        perLine(tokens.content);
      }
    }
    function forStrings(str: string, type: any) {
      const splitted = str.split('\n');
      // Push first part of string to current line
      const first = splitted.shift();
      // tslint:disable-next-line
      if (typeof first === 'undefined') return;
      if (first) {
        lines[lines.length - 1].push({ str: first, type });

        matchAll(first, regexp).forEach((match) => {
          matches[matches.length - 1].push({ str: match.str, type });
        });
      }
      // Push following strings to further lines
      splitted.forEach((x) => {
        matches.push([]);
        matchAll(x, regexp).forEach((match) => {
          matches[matches.length - 1].push({ str: match.str, type });
        });

        if (x) lines.push([{ str: x, type }]);
        else lines.push([]);
      });
    }

    const { regexp } = getOptions();
    // All document, parsed
    const lines: IPrismMatch[][] = [[]];
    // Brackets with their parsed type
    const matches: IPrismMatch[][] = [[]];

    perLine(tokenized);
    return { parsed: lines, matches };
  }
  private getLanguageId(languageID: string): string {
    return ((): string[] => {
      // @ https://github.com/CoenraadS/BracketPair/blob/master/src/documentDecorationManager.ts
      // VSCode language ids need to be mapped for Prism http://prismjs.com/#languages-list
      switch (languageID) {
        case 'ahk':
          return ['autohotkey'];
        case 'bat':
          return ['batch'];
        case 'apex':
          return ['java'];
        case 'gradle':
          return ['groovy'];
        case 'html':
          return ['markup', 'javascript'];
        case 'javascriptreact':
          return ['jsx'];
        case 'json5':
          return ['javascript'];
        case 'jsonc':
          return ['javascript'];
        case 'mathml':
          return ['markup'];
        case 'nunjucks':
          return ['twig'];
        case 'razor':
          return ['markup', 'javascript', 'csharp', 'aspnet'];
        case 'scad':
          return ['swift'];
        case 'svg':
          return ['markup'];
        case 'systemverilog':
          return ['verilog'];
        case 'typescriptreact':
          return ['tsx'];
        case 'vb':
          return ['vbnet'];
        case 'vue':
          return ['markup', 'javascript'];
        case 'xml':
          return ['markup'];
        default:
          return [languageID];
      }
    })()[0];
  }
}
