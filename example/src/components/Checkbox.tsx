import React, { ChangeEvent } from 'react';

interface CheckboxInput {
    label: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    checked: boolean;
    disabled?: boolean;
}

export default function Checkbox({ label, onChange, disabled, checked }: CheckboxInput): JSX.Element {
    return (
        <div className="field is-horizontal">
            <div className="field-label has-text-left is-normal">
                <label className="label checkbox-label">{label}</label>
            </div>
            <div className="field-body">
                <div className="field is-narrow checkbox">
                    <div className="control">
                        <input
                            className="checkbox"
                            type="checkbox"
                            checked={checked}
                            onChange={onChange}
                            disabled={disabled}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
