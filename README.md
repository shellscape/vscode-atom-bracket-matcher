[![marketplace](https://img.shields.io/badge/on-marketplace-blue)](https://marketplace.visualstudio.com/items?itemName=shellscape.shellscape.brackets)
[![openvsx](https://img.shields.io/badge/on-openvsx-blueviolet)](https://open-vsx.org/extension/shellscape/shellscape-brackets)
[![libera manifesto](https://img.shields.io/badge/libera-manifesto-lightgrey.svg)](https://liberamanifesto.com)

# Shellscape Brackets

<div align="center">
	<img width="256" src="https://raw.githubusercontent.com/shellscape/vscode-shellscape-brackets/master/assets/icon-256.png" alt="shellscape-brackets"><br/><br/>
</div>

A subtle bracket match decorator for VS Code based on Atom.

<div align="center">
	<img width="296" src="https://raw.githubusercontent.com/shellscape/vscode-shellscape-brackets/master/assets/example.png" alt="shellscape-brackets"><br/><br/>
</div>

_Shellscape Brackets_ applies a customizable, subtle dotted underline to matching bracket pairs next to the cursor, inspired by Atom's bracket matcher. By default, VS Code [uses outline boxes](https://github.com/Microsoft/vscode/issues/23606), which [impairs visibility](https://github.com/Microsoft/vscode/issues/19534).

## Requirements

This extension requires VS Code v1.73.0 or greater.

## Options

Options for this extension can be set in the [User `settings.json`](https://code.visualstudio.com/docs/getstarted/settings#_settingsjson), and should be prefixed with `shellscapeBrackets`.

### `shellscapeBrackets.disableNative`

Type: `boolean`<br>
Default: `true`

If true, disables VS Code's `matchBrackets` core extension. Set to `false` to prevent disabling `matchBrackets`.

### `shellscapeBrackets.parse`

Type: `boolean`<br>
Default: `true`

If `true`, documents will be parsed using [Prism](http://prismjs.com/) to prevent brackets within strings and comments from being decorated. _Note: [Edge cases](http://prismjs.com/examples.html#failures) may occur_.

### `shellscapeBrackets.pairs`

Bracket pairs consist of an `open` and `close` character, specified by properties of the same name. The default pairs can be seen below:

```json
"shellscapeBrackets.pairs": [
  {
    "open": "(",
    "close": ")"
  },
  {
    "open": "[",
    "close": "]"
  },
  {
    "open": "{",
    "close": "}"
  }
]
```

Parsing can also be disabled for a specific pair, using the `parse: false` property, as seen below:

```json
"shellscapeBrackets.pairs": [
  {
    "open": "(",
    "close": ")",
    "parse": false
  },
  ...
]
```

### `shellscapeBrackets.style`

The appearance of the bracket decorations can be customized using the properties as seen in the default settings seen below. While the extension technically allows any properties [available to decorations](https://code.visualstudio.com/docs/extensionAPI/vscode-api#DecorationRenderOptions), it only officially supports the properties seen below.

```json
"shellscapeBrackets.style": {
  "borderColor": "lime",
  "borderStyle": "none none dotted none",
  "borderWidth": "1px"
}
```

Bracket pairs can also be customized, by adding a `style` property to a pair definition.

```json
"shellscapeBrackets.pairs" : [{
  "open": "{",
  "close": "}",
  "style": {
    "color": "#ff00ff"
  }
}]
```

## Meta

[LICENSE (MIT)](/LICENSE)
