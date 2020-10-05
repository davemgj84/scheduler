import React from "react";
import { render, cleanup } from "@testing-library/react";
import Appointment from "components/Appointment/index";
import { action } from "@storybook/addon-actions/dist/preview";

afterEach(cleanup);

describe("Appointment component", () => {
  const mockInterviewers = ["bob", "mary"];

  const mockInterview = {
    student: "David",
    interviewer: 2,
  };

  const mockAppointment = {
    id: 1,
    time: "4pm",
    interview: {
      student: "David",
      interviewer: 2,
    },
  };

  it("renders without crashing", () => {
    render(
      <Appointment
        key={mockAppointment.id}
        id={mockAppointment.id}
        time={mockAppointment.time}
        interview={mockInterview}
        interviewers={mockInterviewers}
        bookInterview={action("bookInterview")}
        cancelInterview={action("cancelInterview")}
      />
    );
  });
});
