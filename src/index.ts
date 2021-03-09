import { useState, useEffect } from 'react';
import { Precision, Timer, TimerEvent, TimerValues } from 'easytimer.js';

interface TimerHookConfig {
    startValues?: TimerValues;
    target?: TimerValues;
    precision?: Precision;
    countdown?: boolean;
    updateOnTargetAchieved?: boolean;
}

type TimerHookReturn = [Timer, boolean];

const useTimer = ({
    startValues,
    target,
    precision,
    countdown,
    updateOnTargetAchieved,
}: TimerHookConfig = {}): TimerHookReturn => {
    const updateCallback = (timer: Timer) => {
        console.log('set');
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

        if (updateOnTargetAchieved) {
            timer.on('targetAchieved', onTargetAchieved);
        }
    };

    const removeListeners = () => {
        timer.off('started', onStarted);
        timer.off('reset', onStarted);
        timer.off('targetAchieved', onTargetAchieved);
    };

    const unitsToSave = ['days', 'hours', 'minutes', 'seconds', 'secondTenths'];
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

    console.log('useTimer');

    useEffect(() => {
        console.log('effect', timer.getTimeValues().toString());
        addListeners();

        return () => removeListeners();
    }, [updateOnTargetAchieved]);

    useEffect(() => {
        console.log('effect unmount', timer.getTimeValues().toString());

        return () => {
            console.log('return');
            removeListeners();

            timer.stop();
        };
    }, []);

    return [timer, isTargetAchieved];
};

export default useTimer;
