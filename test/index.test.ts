import { act, renderHook } from '@testing-library/react';
import Timer from 'easytimer.js';
import useTimer from '../src';

describe('useTimer hook', () => {
    beforeEach(() => jest.useFakeTimers());

    afterEach(() => jest.restoreAllMocks());

    test('should return an EasyTimer instance and the isTargetAchieved indicator (boolean)', () => {
        const { result } = renderHook(() => useTimer());
        const [timer, isTargetAchieved] = result.current;

        expect(timer).toBeInstanceOf(Timer);
        expect(isTargetAchieved).toBeFalsy();
    });

    test('should return an EasyTimer instance with default values', () => {
        const { result } = renderHook(() => useTimer());
        const [timer] = result.current;
        const config = timer.getConfig();

        expect(config.startValues).toBeNull();
        expect(config.target).toBeNull();
        expect(typeof config.callback).toEqual('function');
        expect(config.precision).toEqual('seconds');
        expect(config.countdown).toBeFalsy();
    });

    test('should configure the start values', () => {
        const { result } = renderHook(() =>
            useTimer({ startValues: { secondTenths: 1, seconds: 10, minutes: 20, hours: 21, days: 35 } }),
        );
        const [timer] = result.current;

        expect(timer.getConfig().startValues).toEqual([1, 10, 20, 21, 35]);
    });

    test('should configure the target values', () => {
        const { result } = renderHook(() =>
            useTimer({ target: { secondTenths: 1, seconds: 10, minutes: 20, hours: 21, days: 35 } }),
        );
        const [timer] = result.current;

        expect(timer.getConfig().target).toEqual([1, 10, 20, 21, 35]);
    });

    test('should configure the countdown flag', () => {
        const { result } = renderHook(() => useTimer({ countdown: true }));
        const [timer] = result.current;

        expect(timer.getConfig().countdown).toBeTruthy();
    });

    test('should configure the precision', () => {
        const { result } = renderHook(() => useTimer({ precision: 'minutes' }));
        const [timer] = result.current;

        expect(timer.getConfig().precision).toEqual('minutes');
    });

    test('should render the test component when the timer is updated', () => {
        let renderCount = 0;
        const { result } = renderHook(() => {
            renderCount++;

            return useTimer({ precision: 'secondTenths' });
        });

        act(() => {
            const [timer] = result.current;
            timer.start();

            jest.advanceTimersByTime(2400);
        });

        const timeValues = result.current[0].getTimeValues();

        expect(renderCount).toEqual(2);
        expect(timeValues).toEqual({ days: 0, hours: 0, minutes: 0, secondTenths: 4, seconds: 2 });
    });

    test('should update the hook when the target is achieved and updateWhenTargetAchieved is enabled', () => {
        const { result } = renderHook(() => {
            return useTimer({ updateWhenTargetAchieved: true, target: { seconds: 2 } });
        });

        act(() => {
            const [timer] = result.current;
            timer.start();

            jest.advanceTimersByTime(2000);
        });

        expect(result.current[1]).toBeTruthy();
    });

    test('should not update the hook when the target is achieved but updateWhenTargetAchieved is disabled', () => {
        const { result } = renderHook(() => {
            return useTimer({ target: { seconds: 2 } });
        });

        act(() => {
            const [timer] = result.current;
            timer.start();

            jest.advanceTimersByTime(2000);
        });

        expect(result.current[1]).toBeFalsy();
    });

    test('should be able to toggle updateWhenTargetAchieved dynamically', () => {
        const { result, rerender } = renderHook(
            (updateWhenTargetAchieved: boolean) => {
                return useTimer({ target: { seconds: 2 }, updateWhenTargetAchieved });
            },
            { initialProps: true },
        );

        act(() => {
            const [timer] = result.current;
            timer.start();

            jest.advanceTimersByTime(2000);
        });

        expect(result.current[1]).toBeTruthy();

        rerender(false);

        act(() => {
            const [timer] = result.current;
            timer.start();

            jest.advanceTimersByTime(2000);
        });

        expect(result.current[1]).toBeFalsy();
    });

    test('should stop the timer when the component unmounts', () => {
        const { result, unmount } = renderHook(() => {
            return useTimer();
        });

        act(() => {
            const [timer] = result.current;
            timer.start();

            jest.advanceTimersByTime(2000);
        });

        unmount();

        expect(result.current[0].isRunning()).toBeFalsy();
    });
});
