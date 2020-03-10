"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var side_nav_component_actions_1 = require("../src/app/side-nav.component.actions");
var mobileApis_component_actions_1 = require("../features/mobileApis.component.actions");
var Action = /** @class */ (function () {
    function Action() {
    }
    return Action;
}());
exports.Action = Action;
var NgAction = /** @class */ (function () {
    function NgAction(store) {
        this.store = store;
        this.actionsQueue = new Array(); // fills as new actions are dispatched
        this.currentIndex = -1;
        this.recording = false;
        this.dispatching = false;
        this.lastTicks = 0;
        this.continuation = false;
        NgAction.store = store;
    }
    NgAction.getInstance = function (store) {
        if (!NgAction.instance) {
            NgAction.instance = new NgAction(store);
        }
        return NgAction.instance;
    };
    NgAction.prototype.startRecording = function () {
        this.recording = true;
        this.lastTicks = 0;
    };
    NgAction.prototype.stopRecording = function () {
        this.recording = false;
    };
    NgAction.prototype.isRecording = function () {
        return this.recording;
    };
    NgAction.prototype.isDispatching = function () {
        return this.dispatching;
    };
    NgAction.prototype.appendToQueue = function (action) {
        if (this.recording) {
            var currentTicks = new Date().getTime();
            if (this.lastTicks === 0) {
                action.delay = 1000;
            }
            else {
                action.delay = currentTicks - this.lastTicks;
            }
            this.lastTicks = currentTicks;
            this.actionsQueue.push(action);
            this.currentIndex = this.actionsQueue.length - 1;
        }
    };
    NgAction.prototype.clearQueue = function () {
        this.actionsQueue.length = 0;
        this.currentIndex = -1;
    };
    NgAction.prototype.getLatestIndex = function () {
        return this.currentIndex;
    };
    NgAction.prototype.setLatestIndex = function (index) {
        this.currentIndex = index;
    };
    NgAction.prototype.singleAction = function (index) {
        this.recording = false;
        this.dispatching = false;
        this.store.dispatch(this.actionsQueue[index]);
        this.currentIndex = index;
    };
    NgAction.prototype.playback = function () {
        var _this = this;
        this.dispatching = true;
        this.recording = false;
        var playbackDelay;
        if (this.currentIndex === this.actionsQueue.length - 1) {
            this.continuation = false;
            playbackDelay = 2000;
            this.currentIndex = -1; // from the beginning
        }
        else {
            this.continuation = true;
            this.currentIndex++;
            playbackDelay = 500; // continuation
        }
        setTimeout(function () { _this.playbackDelayed(); }, playbackDelay);
    };
    NgAction.prototype.playbackDelayed = function () {
        var _this = this;
        this.store.dispatch({ type: '@@INIT' });
        this.store.dispatch({ type: '@@UPDATE_STATE' });
        var delay = 0;
        if (this.currentIndex === -1) {
            this.currentIndex = 0;
        }
        var _loop_1 = function (i) {
            var action = this_1.actionsQueue[i];
            if (action.playback) {
                if (this_1.continuation) {
                    this_1.continuation = false;
                }
                else {
                    delay += action.delay;
                }
                setTimeout(function () {
                    _this.currentIndex = i;
                    _this.store.dispatch(action);
                    if (i === _this.actionsQueue.length - 1) {
                        _this.dispatching = false;
                    }
                }, delay);
            }
        };
        var this_1 = this;
        for (var i = this.currentIndex; i < this.actionsQueue.length; i++) {
            _loop_1(i);
        }
    };
    NgAction.prototype.replaceActionsQueue = function (actionsQueue) {
        var _this = this;
        var newActionsArray = new Array();
        actionsQueue.forEach(function (action) {
            newActionsArray.push(_this.createNewAction(action));
        });
        this.actionsQueue = newActionsArray;
        this.setLatestIndex(this.actionsQueue.length - 1);
    };
    NgAction.prototype.createNewAction = function (action) {
        switch (action.name) {
            case 'NavigateTo':
                return new side_nav_component_actions_1.NavigateTo(action.name, action.title, action.payload, action.playback, action.delay - 0);
            case 'ChangeTab':
                return new mobileApis_component_actions_1.ChangeTabIndex(action.name, action.title, action.payload, action.playback, action.delay - 0);
            case 'SpellChecking':
                return new mobileApis_component_actions_1.ToggleSpellChecking(action.name, action.title, action.payload, action.playback, action.delay - 0);
            case 'UpdateMessage':
                return new mobileApis_component_actions_1.UpdateTextMessage(action.name, action.title, action.payload, action.playback, action.delay - 0);
            case 'ClearMessage':
                return new mobileApis_component_actions_1.ClearTextMessage(action.name, action.title, action.payload, action.playback, action.delay - 0);
            default:
                throw new Error('Action type not found!');
        }
    };
    return NgAction;
}());
exports.NgAction = NgAction;
//# sourceMappingURL=ngAction.js.map