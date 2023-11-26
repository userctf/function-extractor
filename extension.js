const vscode = require('vscode');


function get_selected_text() {
	const editor = vscode.window.activeTextEditor;
	const selection = editor.selection;

	if (selection && !selection.isEmpty) {
    	const selectionRange = new vscode.Range(selection.start.line, selection.start.character, selection.end.line, selection.end.character);
    	const highlighted = editor.document.getText(selectionRange);
		return highlighted;
	}
	return "";
}

function extract() {
	
	vscode.window.showInformationMessage(get_selected_text());
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
