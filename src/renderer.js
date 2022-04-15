
const runBtn = document.getElementById('run_btn');
const commandTxt = document.getElementById('command');
const exec = window.electron_api.exec;
const ipcRenderer = window.electron_api.ipcRenderer;

var term = new Terminal();
term.open(document.getElementById('terminal'));

term.onData(e => {
    ipcRenderer.send("terminal.keystroke", e);
});


window.electron_api.handleIncomingData((event, data) => {
    term.write(data);
});



runBtn.addEventListener('click', () => {
    const command = commandTxt.value
    // window.electron_api.runCommand(command)

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.log(error);
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
});