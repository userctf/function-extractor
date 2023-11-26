# function-extractor VSCode add-on

This extensions allows you to easy separate block of your code in to different functions

## Install
To install this plugin you need to copy folder of this add-on to your add-ons folder. In linux it placed in `~/.vscode/extensions/`

## Example
```js
let a = 10;
let b = 20;

let a_temp = a * a;
let b_temp = b * b;

let c = a_temp + b_temp;
```

Select two lines with "_temp" vars, press ctrl+alt+e, write new function name and get this one:
```js
let a = 10;
let b = 20;


get_c();

function get_c() {
let a_temp = a * a;
let b_temp = b * b;

let c = a_temp + b_temp;
}
```

## Supported languges
All these languages which use 'function' keyword to declare new function
