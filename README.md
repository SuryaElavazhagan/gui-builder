# GUI Editor

## Development Setup
- Clone this repo
- `cd` to the project
```sh
yarn
yarn start
```

## Builder Structure
- Elements available:
  - Text / Heading
  - Button
  - Image
  - Text Input
- Elements can be added to the builder area via drag-n-drop
- Select (Click) the element to edit it's properties
- Properties are divided into two panes: `General` and `Specific`
  - `General`: Tab consists of all the general properties like: Inner Spacing (Padding), Outer Spacing (Margin),
  Shadow, Border Style, Border Width, Border Radius, Background color
  - `Specific`: Tab consists of all the element-specific properties. For example: Text element consists of all the formatting
  options like: Bold, Italic, Underline, etc.
- Like other web-ui builders, I didn't use iframes for holding all the design. I don't want to complicate things (since this is a very small app). Anyway, the HTML string will be sanitized by [dompurify](https://www.npmjs.com/package/dompurify) before getting into localstorage
- All the changes get saved to localstorage, every five seconds. You can also save changes manually using the button in side pane.

## Drag n Drop
- Drag elements from Side Pane or Elements inside the builder
- You can only drop elements inside the builder area (one with dotted black border)
- Hold `Shift` to drag-n-drop the element in absolute position mode
- You can't drop a element below absolute positioned elements

## Text Editing
- In order to edit a text, select the particular text and choose `Specific` tab (it's the default tab) and double click the text
- You can use the following keyboard shortcuts while editing text

Shortcut | Description
--------- | ------------
`META+B` | Bold
`META+I` | Italic
`META+U` | Underline
`META+K` | Link
`META+SHIFT+S` | Strikethrough
`META+SHIFT+L` | Align left
`META+SHIFT+R` | Align right
`META+SHIFT+E` | Align Center
`META+SHIFT+J` | Justify

> NOTE: `META` = `CMD` (⌘) in Mac (or) `Ctrl` in Windows/Linux. Used [tinykeys](https://jamiebuilds.github.io/tinykeys/) for shortcuts
