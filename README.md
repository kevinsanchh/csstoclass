# Inline Style to CSS Class Converter

This Visual Studio Code extension converts inline styles to CSS classes and copies the CSS to the clipboard. It makes it easier to refactor HTML by extracting inline styles and creating reusable CSS classes.

## Features

- Convert inline styles to CSS classes.
- Automatically update the HTML element with the new class.
- Copy the generated CSS class definition to the clipboard.
- Handle HTML elements with or without existing class attributes.

## Installation

1. **Package the Extension**:

   - Open your terminal or command prompt.
   - Navigate to the root directory of the extension (the directory containing `package.json`).
   - Install `vsce` if you haven't already:
     ```bash
     npm install -g vsce
     ```
   - Package the extension:
     ```bash
     vsce package
     ```
   - This will create a `.vsix` file in your extension's root directory.

2. **Install the Extension in VS Code**:
   - Open Visual Studio Code.
   - Press `Ctrl+Shift+X` to open the Extensions view.
   - Click on the three-dot menu in the top-right corner of the Extensions view.
   - Select `Install from VSIX...`.
   - Navigate to and select the `.vsix` file you created earlier.

## Usage

1. **Select an HTML element** in the editor that contains inline styles.
2. **Run the Command**:
   - Press `Ctrl+Shift+C` to run the command.
   - Alternatively, open the Command Palette (`Ctrl+Shift+P`), type "Convert Inline Styles to CSS Class," and select the command.
3. **Enter a Class Name**:
   - When prompted, enter a class name for the extracted styles.
4. **Result**:
   - The inline styles will be removed from the HTML element.
   - The new class will be added to the `class` attribute of the HTML element.
   - The CSS class definition will be copied to your clipboard.

## Example

### Before

```html
<div class="firstClass" style="padding: 10px"></div>
```

### After

```html
<div class="firstClass pad10"></div>
```

### Copied to clipboard

```css
.pad10 {
  padding: 10px;
}
```
