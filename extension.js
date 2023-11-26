'use strict'
const vscode = require('vscode');


function get_selected_block(editor) {
	const selection = editor.selection;

	if (selection && !selection.isEmpty) {
    	const selectionRange = new vscode.Range(selection.start.line, selection.start.character, selection.end.line, selection.end.character);
    	return selectionRange
	}
	return null;
}

async function get_user_input(prompt) {
    const userInput = await vscode.window.showInputBox({ prompt: prompt });
	return userInput;
}


async function extract() {
	const editor = vscode.window.activeTextEditor;
    if (!editor) {
        return; // No active text editor
    }

	const func_name = await get_user_input("Enter new function name");
	const old_code_range = get_selected_block(editor); // remove old code block
	const old_code_block = editor.document.getText(old_code_range)


	const document = editor.document;
    const lastLine = document.lineAt(document.lineCount - 1);
    const endPosition = new vscode.Position(document.lineCount - 1, lastLine.range.end.character);
					 

	editor.edit(editBuilder => {
		// remove old code block
		editBuilder.replace(old_code_range, '\n' + func_name + '();\n');

		// add function at the end
		editBuilder.replace(new vscode.Range(endPosition, endPosition), 
				'\n' + "function " + func_name + "() {\n" +  old_code_block + "\n}" + '\n')
	});
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

