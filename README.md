# EasyTimer React Hook

[EasyTimer](https://github.com/albert-gonzalez/easytimer.js) is a little library that allows to configure and manage a stopwatch or countdown. This React hook allows using EasyTimer with React in a very simple way.

## Install

```sh
npm install --save-dev easytimer-react-hook
```

This hook needs React (>= v16.8) and EasyTimer.js (>= v4) in order to work:

```sh
npm install --save-dev easytimer.js react
```

## Example

You can see a working example of this hook here: https://albert-gonzalez.github.io/easytimer-react-hook ([Source Code](./example))

## Usage

useTimer hook will update the component every time that the EasyTimer instance changes its internal counter or when the target is achieved.

```jsx
import useTimer from 'easytimer-react-hook';

export default () => {
    /* The hook returns an EasyTimer instance and a flag to see if the target has been achieved */
    const [timer, isTargetAchieved] = useTimer({
        /* Hook configuration */
    });

    timer.start({
        /* EasyTimer start configuration */
    });

    return <div>{timer.getTimeValues().toString()}</div>;
};
```

### Configuration

useTimer hook accepts an object with the following options:

-   **startValues:** Optional. Object with the start values. The keys of these object are days, hours, minutes, seconds and secondTenths. The default value makes the timer to start from 0.
-   **target:** Optional. Object with the target. When the timer achieves the target, it will stop automatically. The keys of these object are days, hours, minutes, seconds and secondTenths. If no target is passed, it will be disabled.
-   **precision:** Optional. The frequency that the timer will update the component. The accepted precisions are hours, minutes, seconds and secondTenths. The default value is seconds.
-   **countdown:** Optional. If true the timer will be a countdown. The default value is false.
-   **updateWhenTargetAchieved:** Optional. If true the hook will update the component when the target is achieved. The default value is false.

### EasyTimer instance

useTimer hook returns an EasyTimer instance. This instance is used to manage the timer (start, pause stop and reset the timer). Also, this instance can add custom event listeners if you need a specific behavior.

Check out the EasyTimer docs and examples here: https://github.com/albert-gonzalez/easytimer.js

### TS Types

useTimer hook defines the following typescript types:

```ts
interface TimerHookConfig {
    startValues?: TimerValues;
    target?: TimerValues;
    precision?: Precision;
    countdown?: boolean;
    updateWhenTargetAchieved?: boolean;
}

declare type TimerHookReturn = [Timer, boolean];

declare const useTimer: ({
    startValues,
    target,
    precision,
    countdown,
    updateWhenTargetAchieved,
}?: TimerHookConfig) => TimerHookReturn;
```
