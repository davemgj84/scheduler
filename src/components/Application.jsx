import React, { useState, useEffect } from "react";
import DayList from "components/DayList";
import Appointment from "components/Appointment/index";
import "components/Application.scss";
import axios from "axios"
import getAppointmentsForDay from "../helpers/selectors";

const Application = (props) => {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
    ])
      .then((all) => {
        const days = all[0].data
        const appointments = all[1].data
        setState(prev => ({ ...prev, days, appointments }));
      })
  }, [])

  const appointmentList = dailyAppointments.map(appointment =>
    (
      <Appointment key={appointment.id} {...appointment} />
    )
  )

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentList}
        <Appointment key="last" time="4:20pm" />
      </section>
    </main>
  );
}

export default Application;