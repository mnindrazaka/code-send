import moment from "moment";

export const getFormattedDate = (dateTime: string) => {
  return moment(dateTime).format("L");
};
