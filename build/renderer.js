"use strict";
var runBtn = document.getElementById('run_btn');
var commandTxt = document.getElementById('command');
var exec = window.electron_api.exec;
var term = new Terminal();
term.open(document.getElementById('terminal'));
term.onData(function (e) {
    window.electron_api.terminalKeyStrock(e);
});
window.electron_api.handleIncomingData(function (event, data) {
    term.write(data);
});
runBtn.addEventListener('click', function () {
    var command = commandTxt.value;
    // window.electron_api.runCommand(command)
    exec(command, function (error, stdout, stderr) {
        if (error) {
            console.log(error);
            console.log("error: ".concat(error.message));
            return;
        }
        if (stderr) {
            console.log("stderr: ".concat(stderr));
            return;
        }
        console.log("stdout: ".concat(stdout));
    });
});
