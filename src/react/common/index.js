export const duration = (t1 = 100) => {
  let difference = (100 - t1) * 3000;
  let displayDate = timeDuration(difference);
  return displayDate.toUpperCase();
};

export const timeDuration = (difference) => {
  let weeks = Math.floor(difference / 1000 / 60 / 60 / 24 / 7);
  let day = Math.floor(difference / 1000 / 60 / 60 / 24 - weeks * 7);
  let hrs = Math.floor(difference / 1000 / 60 / 60 - weeks * 7 * 24 - day * 24);
  let min = Math.floor(
    difference / 1000 / 60 - weeks * 7 * 24 * 60 - day * 24 * 60 - hrs * 60
  );
  let sec = Math.floor(
    difference / 1000 -
      weeks * 7 * 24 * 60 * 60 -
      day * 24 * 60 * 60 -
      hrs * 60 * 60 -
      min * 60
  );
  let displayDate = "hrs";
  let data = { day, hrs, min, sec };
  Object.keys(data).some((q) => {
    if (data[q] > 0) {
      displayDate = data[q] + " " + q;
      return true;
    }
  });
  return displayDate;
};

export const convertDistance = (d) => {
  if (d < 1000) {
    return Math.round(d) + " m";
  }
  return Math.round(d) * 0.001 + " km";
};
