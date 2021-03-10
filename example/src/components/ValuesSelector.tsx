import React, { ChangeEvent } from 'react';
import { TimeValues } from '../types';

interface ValuesSelectorInput {
    timeValues: TimeValues;
    disabled?: boolean;
    values: TimeValues;
    setFunction: (value: React.SetStateAction<TimeValues>) => void;
}

export default function ValuesSelector({
    timeValues,
    disabled,
    values,
    setFunction,
}: ValuesSelectorInput): JSX.Element {
    const changeTimeValue = (
        e: ChangeEvent<HTMLInputElement>,
        valueType: string,
        values: TimeValues,
        setFunction: (value: React.SetStateAction<TimeValues>) => void
    ) => {
        let value = Math.min(
            Math.max(parseInt(e.currentTarget.value), parseInt(e.currentTarget.min)),
            parseInt(e.currentTarget.max)
        );

        if (isNaN(value)) {
            value = 0;
        }

        setFunction({
            ...values,
            [valueType]: value,
        });
    };

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
                        onChange={(e) => changeTimeValue(e, 'days', values, setFunction)}
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
                        onChange={(e) => changeTimeValue(e, 'hours', values, setFunction)}
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
                        onChange={(e) => changeTimeValue(e, 'minutes', values, setFunction)}
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
                        onChange={(e) => changeTimeValue(e, 'seconds', values, setFunction)}
                        disabled={disabled}
                    />
                </div>
            </div>
        </div>
    );
}
