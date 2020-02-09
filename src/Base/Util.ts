import moment from "moment";

export default class Util {
  static TIME_ZONE = "+0700";

  static currentTime() {
    return moment.utc().utcOffset(Util.TIME_ZONE);
  }

  static currentUTC() {
    return moment.utc();
  }

  static currentUTCUnix() {
    return this.currentUTC().unix();
  }

  static currentUTCTimestamp() {
    return this.currentUTC().toDate().getTime();
  }

  /**
   * Generate code
   */
  static genId(): string {
    const generate = require('nanoid/generate');
    return generate('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 9).toUpperCase();
  }

  // @nhancv 10/13/19: Check null and undefined
  static isNull = (input: any): boolean => {
    return input === null || input === undefined
  };

  // @nhancv 10/13/19: Check string empty
  static isEmpty = (input: any): boolean => {
    return Util.isNull(input) || input.length === 0;
  };

  // @nhancv 10/13/19: Check boolean type
  static isBoolean = (input: any) => {
    return input === false || input === true;
  };

  static isString = (input: any) => {
    return Object.prototype.toString.call(input) === "[object String]"
  };
}
