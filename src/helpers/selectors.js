

const getAppointmentsForDay = (state, day) => {
  let appointments = [];
  state.days.forEach((eachDay) => {
    if (eachDay.name === day) {
      for (const id of eachDay.appointments) {
        appointments.push(state.appointments[id])
      }
    }
  });
  return appointments;
};

export default getAppointmentsForDay;