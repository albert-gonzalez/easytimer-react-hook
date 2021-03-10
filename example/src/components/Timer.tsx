import { TimeCounter } from 'easytimer.js';
import React from 'react';

interface TimerInput {
    isTargetAchieved: boolean;
    timeValues: TimeCounter;
}

export default function Timer({ isTargetAchieved, timeValues }: TimerInput): JSX.Element {
    return (
        <div className="timer is-flex is-justify-content-center is-align-content-center">
            <div className="is-align-self-center">
                {isTargetAchieved ? (
                    <span>BOOM!!</span>
                ) : (
                    <span>{timeValues.toString(['days', 'hours', 'minutes', 'seconds', 'secondTenths'])}</span>
                )}
            </div>
        </div>
    );
}
