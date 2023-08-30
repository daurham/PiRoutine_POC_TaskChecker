/* Install onoff: npm i onoff
 * Docs: https://www.npmjs.com/package/onoff
 * new Gpio(gpio, direction [, edge] [, options])
 */
import { Gpio } from 'onoff';
// const Run_Pump_For_N_Sec = 3;
// Create the Module class
export class GPIOModule {
    constructor(pin, direction = 'out', edge = undefined, options = undefined) {
        this.pin = pin;
        this.gpio = new Gpio(this.pin, direction, edge, options);
    }
    toggle() {
        const value = this.gpio.readSync();
        this.gpio.writeSync(value === 0 ? 1 : 0);
    }
    // Helpers:
    // 
    // Add module specific helpers here...
    //
    //  Ex:
    // WaterPump
    // runCycle(): void {
    //   const thisGpio = this.gpio;
    //   this.gpio.writeSync(1);
    //   setTimeout(function () {
    //     thisGpio.writeSync(0);
    //   }, Run_Pump_For_N_Sec);
    // }
    // 
    //  Ex:
    // LockBox
    // unlock(): void {
    //   this.gpio.writeSync(1);
    // }
    // 
    //  Ex:
    // lock(): void {
    //   this.gpio.writeSync(0);
    // }
    cleanup() {
        this.gpio.unexport();
    }
}
;
