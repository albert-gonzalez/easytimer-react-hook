import { useState, useEffect } from 'react';
import { Precision, Timer, TimerEvent, TimerValues } from 'easytimer.js';

interface TimerHookConfig {
    startValues?: TimerValues;
    target?: TimerValues;
    precision?: Precision;
    countdown?: boolean;
    updateWhenTargetAchieved?: boolean;
}

type TimerHookReturn = [Timer, boolean];

const useTimer = ({
    startValues,
    target,
    precision,
    countdown,
    updateWhenTargetAchieved,
}: TimerHookConfig = {}): TimerHookReturn => {
    const unitsToSave = ['days', 'hours', 'minutes', 'seconds', 'secondTenths'];

    const updateCallback = (timer: Timer) => {
        setTimerValues(timer.getTimeValues().toString(unitsToSave));
    };

    const onStarted = (e: TimerEvent) => {
        updateCallback(e.detail.timer);
        setIsTargetAchieved(false);
    };

    const onTargetAchieved = () => setIsTargetAchieved(true);

    const addListeners = () => {
        timer.on('started', onStarted);
        timer.on('reset', onStarted);

        if (updateWhenTargetAchieved) {
            timer.on('targetAchieved', onTargetAchieved);
        }
    };

    const removeListeners = () => {
        timer.off('started', onStarted);
        timer.off('reset', onStarted);
        timer.off('targetAchieved', onTargetAchieved);
    };

    const [timer] = useState(
        new Timer({
            startValues,
            target,
            precision,
            countdown,
            callback: updateCallback,
        })
    );
    const [, setTimerValues] = useState(timer.getTimeValues().toString(unitsToSave));
    const [isTargetAchieved, setIsTargetAchieved] = useState(false);

    useEffect(() => {
        addListeners();

        return () => removeListeners();
    }, [updateWhenTargetAchieved]);

    useEffect(() => {
        return () => {
            timer.stop();
            removeListeners();
        };
    }, []);

    return [timer, isTargetAchieved];
};

export default useTimer;
