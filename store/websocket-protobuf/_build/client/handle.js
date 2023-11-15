"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handle = void 0;
var api_1 = require("../lib/api");
var ui_1 = require("./ui");
var handle = function (event) {
    // console.log("Message from server ", event.data);
    var val = JSON.parse(event.data);
    switch (val.type) {
        case api_1.Api.eEdit: {
            break;
        }
        case api_1.Api.eList: {
            ui_1.state.lsList = val.value;
            (0, ui_1.rederList)();
            break;
        }
        case api_1.Api.eRead: {
            (0, ui_1.renderText)(val.lines);
            break;
        }
        // case Api.eEdit:
        // case Api.eEdit:
    }
};
exports.handle = handle;
