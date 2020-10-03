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

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {
        let days;
        if (state.appointments[id].interview === null) {
          if (id >= 1 && id <= 5) {
            days = state.days.map(element => element.id === 1 ? { ...element, spots: element.spots - 1 } : element);
          } else if (id >= 6 && id <= 10) {
            days = state.days.map(element => element.id === 2 ? { ...element, spots: element.spots - 1 } : element);
          } else if (id >= 11 && id <= 15) {
            days = state.days.map(element => element.id === 3 ? { ...element, spots: element.spots - 1 } : element);
          } else if (id >= 16 && id <= 20) {
            days = state.days.map(element => element.id === 4 ? { ...element, spots: element.spots - 1 } : element);
          } else if (id >= 21 && id <= 25) {
            days = state.days.map(element => element.id === 5 ? { ...element, spots: element.spots - 1 } : element);
          };
        };
        if (days) {
          return setState({ ...state, appointments, days });
        } else {
          return setState({ ...state, appointments });
        };
      });
  };

  const cancelInterview = (id) => {

    const appointment = {
      ...state.appointments[id]
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };


    return axios.delete(`/api/appointments/${id}`, appointment)
      .then(() => {
        let days;
        if (id >= 1 && id <= 5) {
          days = state.days.map(element => element.id === 1 ? { ...element, spots: element.spots + 1 } : element);
        } else if (id >= 6 && id <= 10) {
          days = state.days.map(element => element.id === 2 ? { ...element, spots: element.spots + 1 } : element);
        } else if (id >= 11 && id <= 15) {
          days = state.days.map(element => element.id === 3 ? { ...element, spots: element.spots + 1 } : element);
        } else if (id >= 16 && id <= 20) {
          days = state.days.map(element => element.id === 4 ? { ...element, spots: element.spots + 1 } : element);
        } else if (id >= 21 && id <= 25) {
          days = state.days.map(element => element.id === 5 ? { ...element, spots: element.spots + 1 } : element);
        };
        return setState({ ...state, appointments, days });
      });
  };

  return { cancelInterview, setDay, state, bookInterview };

};

export default useApplicationData;