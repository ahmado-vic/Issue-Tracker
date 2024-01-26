export const dateToString = (date: Date) => {
  const fetchedDate = new Date(date);
  const convertedDate = fetchedDate.toDateString();

  return convertedDate;
};
