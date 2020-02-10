import moment from "moment";

export default class Util {
  static TIME_ZONE = "+0700";

  static currentTime() {
    return moment.utc().utcOffset(Util.TIME_ZONE);
  }

  static currentTimeStr() {
    return moment.utc().utcOffset(Util.TIME_ZONE).format("YYYY-MM-DD HH:mm");
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

  static isTrue(value) {
    if (typeof (value) === 'string') {
      value = value.trim().toLowerCase();
    }
    switch (value) {
      case true:
      case "true":
      case 1:
      case "1":
      case "on":
      case "yes":
        return true;
      default:
        return false;
    }
  }

  static isString = (input: any) => {
    return Object.prototype.toString.call(input) === "[object String]"
  };
}
