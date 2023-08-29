import { Precision, Timer, TimerValues } from 'easytimer.js';
interface TimerHookConfig {
    startValues?: TimerValues;
    target?: TimerValues;
    precision?: Precision;
    countdown?: boolean;
    updateWhenTargetAchieved?: boolean;
}
type TimerHookReturn = [Timer, boolean];
declare const useTimer: ({ startValues, target, precision, countdown, updateWhenTargetAchieved, }?: TimerHookConfig) => TimerHookReturn;
export default useTimer;
