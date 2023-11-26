const vscode = require('vscode');


function get_selected_text(editor) {
	const selection = editor.selection;

	if (selection && !selection.isEmpty) {
    	const selectionRange = new vscode.Range(selection.start.line, selection.start.character, selection.end.line, selection.end.character);
    	const highlighted = editor.document.getText(selectionRange);
		return highlighted;
	}
	return "";
}

function paste_at_the_end(editor, content) {
	const document = editor.document;
    const lastLine = document.lineAt(document.lineCount - 1);
    const endPosition = new vscode.Position(document.lineCount - 1, lastLine.range.end.character);

	editor.edit(editBuilder => {
        editBuilder.replace(new vscode.Range(endPosition, endPosition), "\n"+ content + "\n");
    });
}

async function get_user_input(prompt) {
    const userInput = await vscode.window.showInputBox({ prompt: prompt });

	return userInput;
}


function extract() {
	const editor = vscode.window.activeTextEditor;
    if (!editor) {
        return; // No active text editor
    }

	const func_name = get_user_input("Enter new function name");


	paste_at_the_end("Test text at the end of the file")

	vscode.window.showInformationMessage(get_selected_text(editor));

	editor.edit((selectedText) => {
    	selectedText.replace(editor.selection, "Aboba");
	})
}

function activate(context) {
	console.log('Congratulations, your extension "function-extractor" is now active!');
	const extract_func = vscode.commands.registerCommand("function-extractor.extract", extract);
	context.subscriptions.push(extract_func);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}

