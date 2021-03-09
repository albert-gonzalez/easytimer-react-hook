import React, { ChangeEvent, useState } from 'react';
import useTimer from '../../src';
import './App.scss';
import ValuesSelector from './components/ValuesSelector';
import { TimeValues } from './types';
import { Precision } from 'easytimer.js';

export default (): JSX.Element => {
    const changeTimeValue = (
        e: ChangeEvent<HTMLInputElement>,
        valueType: string,
        values: TimeValues,
        setFunction: (value: React.SetStateAction<TimeValues>) => void
    ) => {
        const value = Math.min(
            Math.max(parseInt(e.currentTarget.value), parseInt(e.currentTarget.min)),
            parseInt(e.currentTarget.max)
        );

        if (isNaN(value)) {
            return;
        }

        setFunction({
            ...values,
            [valueType]: value,
        });
    };

    const changeStartValue = (e: ChangeEvent<HTMLInputElement>, valueType: string) =>
        changeTimeValue(e, valueType, startValues, setStartValues);
    const changeTarget = (e: ChangeEvent<HTMLInputElement>, valueType: string) =>
        changeTimeValue(e, valueType, target, setTarget);

    const [startValues, setStartValues] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        secondTenths: 0,
    } as TimeValues);
    const [target, setTarget] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        secondTenths: 0,
    } as TimeValues);
    const [isTargetEnabled, setIsTargetEnabled] = useState(false);
    const [isCountdown, setIsCountdown] = useState(false);
    const [precision, setPrecision] = useState('seconds' as Precision);
    const [updateOnTargetAchieved, setUpdateOnTargetAchieved] = useState(false);
    const [timer, isTargetAchieved] = useTimer({ updateOnTargetAchieved });

    return (
        <div className="columns is-multiline my-0">
            <div className="timer column is-flex is-full is-half-desktop is-three-fifths-fullhd is-justify-content-center is-align-content-center">
                <div className="is-align-self-center">
                    {isTargetAchieved ? (
                        <span>BOOM!!</span>
                    ) : (
                        <span>
                            {timer.getTimeValues().toString(['days', 'hours', 'minutes', 'seconds', 'secondTenths'])}
                        </span>
                    )}
                </div>
            </div>
            <div className="column">
                <div className="container is-fluid">
                    <div>
                        <h4 className="title is-5">Controls</h4>
                        <div className="buttons are-large has-addons is-centered">
                            <a
                                className="button is-primary is-light"
                                onClick={() =>
                                    timer.start({
                                        startValues,
                                        target: isTargetEnabled ? target : undefined,
                                        countdown: isCountdown,
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
                        <hr className="mt-0" />
                    </div>

                    <div>
                        <h4 className="title is-5">Start Values</h4>
                        <ValuesSelector timeValues={startValues} changeTimeValues={changeStartValue} />
                        <hr className="mt-0" />
                    </div>

                    <div>
                        <h4 className="title is-5">Target</h4>
                        <div className="columns">
                            <div className="column">
                                <div className="field is-horizontal">
                                    <div className="field-label has-text-left is-normal">
                                        <label className="label checkbox-label">Enable target</label>
                                    </div>
                                    <div className="field-body">
                                        <div className="field is-narrow checkbox">
                                            <div className="control">
                                                <input
                                                    className="checkbox"
                                                    type="checkbox"
                                                    checked={isTargetEnabled}
                                                    onChange={(e) => setIsTargetEnabled(e.currentTarget.checked)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="column">
                                <div className="field is-horizontal">
                                    <div className="field-label has-text-left is-normal">
                                        <label className="label checkbox-label">Update on target achieved</label>
                                    </div>
                                    <div className="field-body">
                                        <div className="field is-narrow checkbox">
                                            <div className="control">
                                                <input
                                                    className="checkbox"
                                                    type="checkbox"
                                                    checked={updateOnTargetAchieved}
                                                    onChange={(e) => setUpdateOnTargetAchieved(e.currentTarget.checked)}
                                                    disabled={!isTargetEnabled}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <ValuesSelector
                            timeValues={target}
                            changeTimeValues={changeTarget}
                            disabled={!isTargetEnabled}
                        />
                        <hr className="mt-0" />
                    </div>

                    <div>
                        <h3 className="title is-5">Type</h3>
                        <div className="columns">
                            <div className="column">
                                <div className="field is-horizontal">
                                    <div className="field-label has-text-left is-normal">
                                        <label className="label">Countdown</label>
                                    </div>
                                    <div className="field-body">
                                        <div className="field is-narrow checkbox">
                                            <div className="control">
                                                <input
                                                    className="checkbox"
                                                    type="checkbox"
                                                    checked={isCountdown}
                                                    onChange={(e) => setIsCountdown(e.currentTarget.checked)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="column">
                                <div className="field is-horizontal">
                                    <div className="field-label has-text-left is-normal">
                                        <label className="label">Precision</label>
                                    </div>
                                    <div className="field-body">
                                        <div className="field is-narrow">
                                            <div className="control">
                                                <div className="select">
                                                    <select
                                                        onChange={(e) =>
                                                            setPrecision(e.currentTarget.value as Precision)
                                                        }
                                                        value={precision}
                                                    >
                                                        <option value="seconds">Seconds</option>
                                                        <option value="secondTenths">Tenths of a second</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className="mt-0" />
                    </div>
                </div>
            </div>
        </div>
    );
};
