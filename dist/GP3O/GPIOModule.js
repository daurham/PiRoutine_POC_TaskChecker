/* Install onoff: npm i onoff
 * Docs: https://www.npmjs.com/package/onoff
 * new Gpio(gpio, direction [, edge] [, options])
 */
import { Gpio } from 'onoff';
// GPIO Module base class
export class GPIOModule {
    constructor(pin, direction = 'out', edge = undefined, options = undefined) {
        this.pin = pin;
        this.gpio = new Gpio(this.pin, direction, edge, options);
    }
    // Helpers:
    toggle() {
        const value = this.gpio.readSync();
        this.gpio.writeSync(value === 0 ? 1 : 0);
    }
    on() {
        const value = this.gpio.readSync();
        if (value === 0) {
            this.gpio.writeSync(1);
        }
    }
    off() {
        const value = this.gpio.readSync();
        if (value === 1) {
            this.gpio.writeSync(0);
        }
    }
    cleanup() {
        this.gpio.unexport();
    }
}
;
/**
 * LED Module
 */
export class LED extends GPIOModule {
    constructor(pin, direction = 'out', edge = undefined, options = undefined) {
        super(pin, direction, edge, options);
    }
    // Helpers
    blink(miliseconds = 1000) {
        const LED = this;
        LED.on();
        setTimeout(function () {
            LED.off();
            LED.cleanup(); // ?
        }, miliseconds);
    }
}
;
/**
 * WaterPump Module
 */
export class WaterPump extends GPIOModule {
    constructor(pin, direction = 'out', edge = undefined, options = undefined) {
        super(pin, direction, edge, options);
    }
    // Helpers
    runPump(miliseconds = 7000) {
        const Pump = this;
        Pump.on();
        setTimeout(function () {
            Pump.off();
            Pump.cleanup(); // ?
        }, miliseconds);
    }
}
;
/**
 * LockBox Module
 */
export class LockBox extends GPIOModule {
    constructor(pin, direction = 'out', edge = undefined, options = undefined) {
        super(pin, direction, edge, options);
    }
    // Helpers
    lock() {
        const LockBox = this;
        LockBox.on();
    }
    unlock() {
        const LockBox = this;
        LockBox.off();
    }
}
;
