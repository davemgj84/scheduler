// Helper selectors (functions):

const getAppointmentsForDay = (state, day) => {
  let appointments = [];
  state.days.forEach((eachDay) => {
    if (eachDay.name === day) {
      for (const id of eachDay.appointments) {
        appointments.push(state.appointments[id])
      };
    };
  });
  return appointments;
};

const getInterview = (state, interview) => {
  if (!interview) {
    return null;
  };
  const interviewObject = {};
  for (const id in state.interviewers) {
    if (interview.interviewer === state.interviewers[id].id) {
      interviewObject.student = interview.student;
      interviewObject.interviewer = state.interviewers[id];
    };
  };
  return interviewObject;
};

export { getAppointmentsForDay, getInterview };

