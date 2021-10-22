const vscode = require('vscode');
const { getExtensionList, installExtensionList } = require('./utils');
const dummyExtensionList = require('./resources/dummyExtensionList.json');

/** @param {vscode.ExtensionContext} context */
function activate(context) {
	console.log('auto-extension-installer is initialized!');

	let disposable = vscode.commands.registerCommand('auto-extension-installer.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from Auto extension installer!');
	});

	let exportExtensions = vscode.commands.registerCommand('auto-extension-installer.exportExtensions', () => {
		console.log("Exporting extensions");
		vscode.window.showInformationMessage('Exporting extensions');

		const extensionList = getExtensionList(context);

		console.log("Exported extensions:");
		console.log(extensionList);
		vscode.window.showInformationMessage('Exported extensions');
	});

	const installExtensions = vscode.commands.registerCommand('auto-extension-installer.installExtensions', () => {
		console.log(dummyExtensionList.extensionList)
		console.log("Here");
		installExtensionList(context, dummyExtensionList.extensionList);
	});

	context.subscriptions.push(disposable, exportExtensions, installExtensions);
}

function deactivate() {
	console.log('Exiting auto-extension-installer :(');
}

module.exports = {
	activate,
	deactivate
}
