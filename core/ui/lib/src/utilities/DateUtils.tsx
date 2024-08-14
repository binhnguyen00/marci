import moment from "moment";

export class DateUtils {
  private static date = "DD-MM-YYYY";
  private static timestamp = "DD-MM-YYYY HH:mm:ss";
  private static timestampTz = "DD-MM-YYYY HH:mm:ssZ";
  
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