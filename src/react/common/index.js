export const duration = (t1 = 100) => {
  let difference = (100 - t1) * 3000;

  let weeks = Math.floor(difference / 1000 / 60 / 60 / 24 / 7);
  let DAY = Math.floor(difference / 1000 / 60 / 60 / 24 - weeks * 7);
  let HRS = Math.floor(difference / 1000 / 60 / 60 - weeks * 7 * 24 - DAY * 24);
  let MIN = Math.floor(
    difference / 1000 / 60 - weeks * 7 * 24 * 60 - DAY * 24 * 60 - HRS * 60
  );
  let SEC = Math.floor(
    difference / 1000 -
      weeks * 7 * 24 * 60 * 60 -
      DAY * 24 * 60 * 60 -
      HRS * 60 * 60 -
      MIN * 60
  );
  let displayDate = "HRS";
  ["DAY", "HRS", "MIN", "SEC"].some((q) => {
    if (eval(q) > 0) {
      displayDate = eval(q) + " " + q;

      return true;
    }
  });
  if (weeks > 0) {
    displayDate = new Date(t1).toDateString();
  }
  return displayDate;
};
