import moment from "moment/moment";

export const getFormattedDate = (dateTime: string) => {
  return moment(dateTime).format("L");
};
