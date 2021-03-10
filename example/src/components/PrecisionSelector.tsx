import { Precision } from 'easytimer.js';
import React, { ChangeEvent } from 'react';

interface PrecisionSelectorInput {
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    precision: Precision;
}

export default function PrecisionSelector({ onChange, precision }: PrecisionSelectorInput): JSX.Element {
    return (
        <div className="field is-horizontal">
            <div className="field-label has-text-left is-normal">
                <label className="label">Precision</label>
            </div>
            <div className="field-body">
                <div className="field is-narrow">
                    <div className="control">
                        <div className="select">
                            <select onChange={onChange} value={precision}>
                                <option value="seconds">Seconds</option>
                                <option value="secondTenths">Tenths of a second</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
