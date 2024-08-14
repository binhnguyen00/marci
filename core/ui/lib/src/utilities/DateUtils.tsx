import moment from "moment";

export class DateUtils {
  static date = "DD-MM-YYYY";
  static timestamp = "DD-MM-YYYY HH:mm:ss";
  static timestampTz = "DD-MM-YYYY HH:mm:ssZ";
  
  static getCurrentDate(format: string = this.date): string {
    return moment().format(format);
  }

  static getTimestamp(format: string = this.timestamp): string {
    return moment().format(format);
  }

  static getTimestampTz(format: string = this.timestampTz): string {
    return moment().format(format);
  }

  static extractDate(target: string) {
    return moment(target).format(this.date);
  }

  static extractDateTime(target: string) {
    return moment(target).format(this.timestamp);
  }
}