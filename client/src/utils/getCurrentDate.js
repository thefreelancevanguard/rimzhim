export const getCurrentDate = () => {
  const date = new Date();
  return date.toDateString().slice(4);
};
