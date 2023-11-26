const vscode = require('vscode');


function activate(context) {

	console.log('Congratulations, your extension "function-extractor" is now active!');
	let disposable = vscode.commands.registerCommand('function-extractor.extract', function () {

		vscode.window.showInformationMessage('Hello World from function extractor!');
	});

	context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
