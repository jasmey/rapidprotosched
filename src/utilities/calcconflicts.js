export const find_conflict = (input_str1, input_str2) => {
  // if str2 conflicts with str1, return true
  const inputs = [input_str1, input_str2];

  //find times in minutes, given a string
  const times = inputs.map((input_str) => {
    const [days, tRange] = input_str.split(" ");

    const [sTime, eTime] = tRange.split("-");

    const [sHour, sMinute] = sTime.split(":").map(Number);
    const [eHour, eMinute] = eTime.split(":").map(Number);

    const meetingDays = days; // e.g., "MWF"
    //record meeting times in number of minutes
    const meetingStartTime = 60 * +sHour + +sMinute;
    const meetingEndTime = 60 * +eHour + +eMinute;

    return {
      days: meetingDays,
      start: meetingStartTime,
      end: meetingEndTime,
      duration: meetingEndTime - meetingStartTime,
    };
  });

  ///////
  const input1 = times[0];
  const input2 = times[1];

  if (input1.days == input2.days) {
    //if the days r same
    if (
      (input2.start >= input1.start && input2.start <= input1.end) || //2 starts during 1
      (input1.start > input2.start && input1.start < input2.end) //1 starts during 2
    ) {
      return true; //if 1 is alr chosen, 2 will conflict
    }
  }
  return false;
};
