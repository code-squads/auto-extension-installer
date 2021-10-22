const vscode = require('vscode');
const { readFile, readFileSync, readdirSync, statSync, writeFileSync } = require("fs");

function getExtensionList(context) {
    const res = vscode.extensions.all
        .filter(e => !e.packageJSON.isBuiltin)
        .map(e => {
            return {
                id: e.id,
                uuid: e.packageJSON.uuid,
                name: e.packageJSON.name,
                publisher: e.packageJSON.publisher,
                version: e.packageJSON.version,
            };
        });
    return res;
};

const installExtensionList = async function (context, extensionList) {
    
    for(let extInfo of extensionList){
		console.log(`Installing ${extInfo.name}`);
        vscode.window.showInformationMessage(`Installing ${extInfo.name}`);
        await vscode.commands.executeCommand(
            "workbench.extensions.installExtension",
            `${extInfo.publisher}.${extInfo.name}`
        );
    }

    vscode.window.showInformationMessage(`Installed all the extensions !!`);
};

// export const exportSetting = async function (context){
//     const resData = JSON.stringify({
//         'settings.json': getUserSettings(context),
//         'keybindings.json': getKeyBinding(context),
//         'extensionList': getExtensionList(context),
//         'snippets': getSnippets(context),
//     });

//     const uri = await vscode.window.showSaveDialog({ defaultUri: vscode.Uri.file('vscode-setting-export.json') });
//     if (!uri) {
//         return false;
//     }
//     writeFileSync(uri.fsPath, resData);
//     return true;
// };

// export const importSetting = async function (context){
//     const uris = await vscode.window.showOpenDialog({
//         canSelectMany: false,
//         canSelectFolders: false,
//         filters: {
//             json: ['json']
//         }
//     });
//     if (!uris || !uris.length) {
//         return false;
//     }
//     const dataStr = readFileSync(uris[0].fsPath, 'utf-8');
//     if (!dataStr) {
//         vscode.window.showInformationMessage('导入失败');
//         return false;
//     }
//     const data = JSON.parse(dataStr);
//     if (data["settings.json"]) {
//         await restoreUserSettings(context, data["settings.json"]);
//     }
//     if (data["keybindings.json"]) {
//         await restoreKeyBinding(context, data["keybindings.json"]);
//     }
//     if (data.snippets) {
//         await restoreSnippets(context, data.snippets);
//     }
//     if (data["extensionList"]) {
//         await restoreExtensionList(context, data["extensionList"]);
//     }
//     vscode.commands.executeCommand("workbench.action.reloadWindow");
//     return true;
// };


module.exports = {
    getExtensionList,
    installExtensionList
}