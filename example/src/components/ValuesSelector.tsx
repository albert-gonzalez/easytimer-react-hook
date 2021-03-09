import React, { ChangeEvent } from 'react';
import { TimeValues } from '../types';

interface ValuesSelectorInput {
    timeValues: TimeValues;
    changeTimeValues: (e: ChangeEvent<HTMLInputElement>, valueType: string) => void;
    disabled?: boolean;
}

export default function ValuesSelector({ timeValues, changeTimeValues, disabled }: ValuesSelectorInput): JSX.Element {
    return (
        <div className="columns is-mobile is-multiline">
            <div className="field column is-half-mobile">
                <label className="label">Days</label>
                <div className="control">
                    <input
                        className="input"
                        type="number"
                        value={timeValues.days}
                        min="0"
                        max="1000"
                        onChange={(e) => changeTimeValues(e, 'days')}
                        disabled={disabled}
                    />
                </div>
            </div>
            <div className="field column is-half-mobile">
                <label className="label">Hours</label>
                <div className="control">
                    <input
                        className="input"
                        type="number"
                        value={timeValues.hours}
                        min="0"
                        max="23"
                        onChange={(e) => changeTimeValues(e, 'hours')}
                        disabled={disabled}
                    />
                </div>
            </div>
            <div className="field column is-half-mobile">
                <label className="label">Minutes</label>
                <div className="control">
                    <input
                        className="input"
                        type="number"
                        value={timeValues.minutes}
                        min="0"
                        max="59"
                        onChange={(e) => changeTimeValues(e, 'minutes')}
                        disabled={disabled}
                    />
                </div>
            </div>
            <div className="field column is-half-mobile">
                <label className="label">Seconds</label>
                <div className="control">
                    <input
                        className="input"
                        type="number"
                        value={timeValues.seconds}
                        min="0"
                        max="59"
                        onChange={(e) => changeTimeValues(e, 'seconds')}
                        disabled={disabled}
                    />
                </div>
            </div>
        </div>
    );
}
