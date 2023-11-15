"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uiInit = exports.renderText = exports.rederList = exports.cursorList = exports.state = void 0;
var api_1 = require("../lib/api");
var client_1 = require("./client");
var fRat = 5 / 3;
var fSize = 20;
function resizeCanvas() {
    client_1.canvas.width = window.innerWidth;
    client_1.canvas.height = window.innerHeight;
}
exports.state = {
    lsList: []
};
exports.cursorList = 0;
document.addEventListener("keypress", function (e) {
    var requestFileContext = function () {
        if (exports.state.lsList[exports.cursorList].fileType == api_1.FileType.File) {
            client_1.socket.send(JSON.stringify({
                filePath: "./".concat(exports.state.lsList[exports.cursorList].name),
                startLine: 0,
                countLine: 20,
                type: api_1.Api.eRead,
            }));
        }
    };
    switch (e.key) {
        case 'i': {
            client_1.socket.send(JSON.stringify({ type: api_1.Api.eList, s: 0 }));
            console.log(20 / 12);
            break;
        }
        case 'j': {
            exports.cursorList += 1;
            (0, exports.rederList)();
            requestFileContext();
            break;
        }
        case 'k': {
            if (exports.cursorList > 0) {
                exports.cursorList -= 1;
            }
            (0, exports.rederList)();
            requestFileContext();
            break;
        }
    }
});
var rederList = function () {
    var lslist = exports.state.lsList;
    client_1.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    client_1.ctx.fillStyle = "red";
    client_1.ctx.fillRect(10, 25 * (exports.cursorList) + 10, client_1.ctx.measureText(lslist[exports.cursorList].name).width, 20);
    client_1.ctx.fillStyle = "black";
    lslist.forEach(function (x, i) {
        client_1.ctx.fillText("".concat(x.name), 10, 25 * (i + 1));
    });
};
exports.rederList = rederList;
var renderText = function (text) {
    client_1.ctx.clearRect(400, 0, window.innerWidth - 400, window.innerHeight);
    text.forEach(function (x, i) {
        client_1.ctx.fillStyle = "black";
        client_1.ctx.fillText(x, 410, 30 + 25 * i);
    });
};
exports.renderText = renderText;
var uiInit = function () {
    resizeCanvas();
    document.body.style.margin = "0";
    document.body.style.border = "0";
    window.addEventListener("resize", resizeCanvas);
    client_1.canvas.style.display = "block";
    document.body.appendChild(client_1.canvas);
    // ctx.fillStyle = "red"
    // ctx.fillRect(0,0,100,100)
    client_1.ctx.font = "".concat(fSize, "px monospace");
    // ctx.strokeText("caio l", 100, 40)
    // if (canvas.getContext) {
    //   if (ctx) {
    //     ctx.fillStyle = 'red';
    //     ctx.fillRect(50, 50, 200, 100);
    //   } else {
    //     alert('2D context is not supported by your browser.');
    //   }
    // } else {
    //   alert('Canvas is not supported by your browser.');
    // }
};
exports.uiInit = uiInit;
