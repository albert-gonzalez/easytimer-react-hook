import React, { useState } from 'react';
import useTimer from '../../src';
import './App.scss';
import ValuesSelector from './components/ValuesSelector';
import { TimeValues } from './types';
import { Precision } from 'easytimer.js';
import Checkbox from './components/Checkbox';
import Timer from './components/Timer';
import Buttons from './components/Buttons';
import PrecisionSelector from './components/PrecisionSelector';

const App = (): JSX.Element => {
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
    const [updateWhenTargetAchieved, setUpdateWhenTargetAchieved] = useState(false);
    const [timer, isTargetAchieved] = useTimer({ updateWhenTargetAchieved });

    return (
        <div className="columns is-multiline is-gapless">
            <div className="column is-full is-half-desktop is-three-fifths-fullhd ">
                <Timer isTargetAchieved={isTargetAchieved} timeValues={timer.getTimeValues()} />
            </div>

            <div className="column mt-5">
                <div className="container is-fluid">
                    <div>
                        <h4 className="title is-5">Controls</h4>
                        <Buttons
                            timer={timer}
                            startValues={startValues}
                            target={isTargetEnabled ? target : undefined}
                            countdown={isCountdown}
                            precision={precision}
                        />
                        <hr className="mt-0" />
                    </div>

                    <div>
                        <h4 className="title is-5">Start Values</h4>
                        <ValuesSelector timeValues={startValues} setFunction={setStartValues} values={startValues} />
                        <hr className="mt-0" />
                    </div>

                    <div>
                        <h4 className="title is-5">Target</h4>
                        <div className="columns">
                            <div className="column">
                                <Checkbox
                                    label="Enable target"
                                    checked={isTargetEnabled}
                                    onChange={(e) => setIsTargetEnabled(e.currentTarget.checked)}
                                />
                            </div>
                            <div className="column">
                                <Checkbox
                                    label="Update when target achieved"
                                    checked={updateWhenTargetAchieved}
                                    onChange={(e) => setUpdateWhenTargetAchieved(e.currentTarget.checked)}
                                    disabled={!isTargetEnabled}
                                />
                            </div>
                        </div>

                        <ValuesSelector
                            timeValues={target}
                            setFunction={setTarget}
                            values={target}
                            disabled={!isTargetEnabled}
                        />
                        <hr className="mt-0" />
                    </div>

                    <div>
                        <h3 className="title is-5">Type</h3>
                        <div className="columns">
                            <div className="column">
                                <Checkbox
                                    label="Countdown"
                                    checked={isCountdown}
                                    onChange={(e) => setIsCountdown(e.currentTarget.checked)}
                                />
                            </div>
                            <div className="column">
                                <PrecisionSelector
                                    onChange={(e) => setPrecision(e.currentTarget.value as Precision)}
                                    precision={precision}
                                />
                            </div>
                        </div>
                        <hr className="mt-0" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
