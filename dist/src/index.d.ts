import { Precision, Timer, TimerValues } from 'easytimer.js';
interface TimerHookConfig {
    startValues?: TimerValues;
    target?: TimerValues;
    precision?: Precision;
    countdown?: boolean;
    updateOnTargetAchieved?: boolean;
}
declare type TimerHookReturn = [Timer, boolean];
declare const useTimer: ({ startValues, target, precision, countdown, updateOnTargetAchieved, }?: TimerHookConfig) => TimerHookReturn;
export default useTimer;
