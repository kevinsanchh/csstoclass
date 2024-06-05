import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand("extension.convertInlineStyles", async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return;
    }

    const document = editor.document;
    const selection = editor.selection;
    const text = document.getText(selection);

    const styleRegex = /style\s*=\s*"([^"]*)"/;
    const classRegex = /class\s*=\s*"([^"]*)"/;
    const styleMatch = styleRegex.exec(text);

    if (styleMatch && styleMatch[1]) {
      const styleString = styleMatch[1];
      const styles = styleString.split(";").filter((s) => s.trim().length > 0);
      const className = await vscode.window.showInputBox({ prompt: "Enter the class name" });

      if (className) {
        let css = `.${className} {\n`;
        styles.forEach((style) => {
          css += `  ${style.trim()};\n`;
        });
        css += `}`;

        let newText = text.replace(styleRegex, ""); // Remove style attribute

        const classMatch = classRegex.exec(newText);
        if (classMatch && classMatch[1]) {
          // If class attribute exists, add new class to existing classes
          newText = newText.replace(classRegex, `class="${classMatch[1]} ${className}"`);
        } else {
          // If no class attribute, add one with the new class
          newText = newText.replace(/^<(\w+)/, `<$1 class="${className}"`);
        }

        editor.edit((editBuilder) => {
          editBuilder.replace(selection, newText);
        });

        vscode.env.clipboard.writeText(css).then(() => {
          vscode.window.showInformationMessage(`CSS copied to clipboard:\n${css}`);
        });
      }
    } else {
      vscode.window.showErrorMessage("No inline styles found in the selected text.");
    }
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {}
