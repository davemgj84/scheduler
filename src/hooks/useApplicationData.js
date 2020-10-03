import { useState, useEffect } from "react";
import axios from "axios";

const useApplicationData = () => {

  const setDay = day => setState({ ...state, day });

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
      .then((all) => {
        const days = all[0].data
        const appointments = all[1].data
        const interviewers = all[2].data
        setState(prev => ({ ...prev, days, appointments, interviewers }));
      });
  }, []);

  const bookInterview = (id, interview) => {

    const foundDay = state.days.find((day) => day.appointments.includes(id));

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = state.days.map((day) => {
      if (day.name === foundDay.name && state.appointments[id].interview === null) {
        return { ...day, spots: day.spots - 1 };
      } else {
        return day;
      };
    });

    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {
        return setState({ ...state, appointments, days })
      });
  };

  const cancelInterview = (id) => {

    const foundDay = state.days.find((day) => day.appointments.includes(id));

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = state.days.map((day, index) => {
      if (day.name === foundDay.name) {
        return { ...day, spots: day.spots + 1 };
      } else {
        return day;
      };
    });

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        return setState({ ...state, appointments, days });
      });
  };

  return { cancelInterview, setDay, state, bookInterview };

};

export default useApplicationData;
