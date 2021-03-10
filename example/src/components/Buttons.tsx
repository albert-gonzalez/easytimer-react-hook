import Timer, { Precision } from 'easytimer.js';
import React from 'react';
import { TimeValues } from '../types';

interface ButtonsInput {
    timer: Timer;
    startValues: TimeValues;
    target?: TimeValues;
    countdown: boolean;
    precision: Precision;
}

export default function Buttons({ timer, startValues, target, countdown, precision }: ButtonsInput): JSX.Element {
    return (
        <div className="buttons are-large has-addons is-centered">
            <a
                className="button is-primary is-light"
                onClick={() =>
                    timer.start({
                        startValues,
                        target,
                        countdown,
                        precision,
                    })
                }
            >
                Start
            </a>
            <a className="button is-light is-warning" onClick={() => timer.pause()}>
                Pause
            </a>
            <a className="button is-light is-danger" onClick={() => timer.stop()}>
                Stop
            </a>
            <a className="button is-light is-link" onClick={() => timer.reset()}>
                Reset
            </a>
        </div>
    );
}
