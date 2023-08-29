/**
 * easytimer-react-hook
 * Generated: 2023-08-29
 * Version: 2.1.0
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('easytimer.js')) :
    typeof define === 'function' && define.amd ? define(['exports', 'react', 'easytimer.js'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global["easytimer-react-hook"] = {}, global.React, global.easytimer));
})(this, (function (exports, react, easytimer_js) { 'use strict';

    var useTimer = function (_a) {
        var _b = _a === void 0 ? {} : _a, startValues = _b.startValues, target = _b.target, precision = _b.precision, countdown = _b.countdown, updateWhenTargetAchieved = _b.updateWhenTargetAchieved;
        var unitsToSave = ['days', 'hours', 'minutes', 'seconds', 'secondTenths'];
        var updateCallback = function (timer) {
            setTimerValues(timer.getTimeValues().toString(unitsToSave));
        };
        var onStarted = function (e) {
            updateCallback(e.detail.timer);
            setIsTargetAchieved(false);
        };
        var onTargetAchieved = function () { return setIsTargetAchieved(true); };
        var addListeners = function () {
            timer.on('started', onStarted);
            timer.on('reset', onStarted);
            if (updateWhenTargetAchieved) {
                timer.on('targetAchieved', onTargetAchieved);
            }
        };
        var removeListeners = function () {
            timer.off('started', onStarted);
            timer.off('reset', onStarted);
            timer.off('targetAchieved', onTargetAchieved);
        };
        var timer = react.useState(new easytimer_js.Timer({
            startValues: startValues,
            target: target,
            precision: precision,
            countdown: countdown,
            callback: updateCallback,
        }))[0];
        var _c = react.useState(timer.getTimeValues().toString(unitsToSave)), setTimerValues = _c[1];
        var _d = react.useState(false), isTargetAchieved = _d[0], setIsTargetAchieved = _d[1];
        react.useEffect(function () {
            addListeners();
            return function () { return removeListeners(); };
        }, [updateWhenTargetAchieved]);
        react.useEffect(function () {
            return function () {
                timer.stop();
                removeListeners();
            };
        }, []);
        return [timer, isTargetAchieved];
    };

    exports.default = useTimer;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
