import { expect, test } from "vitest";
import { Appointment } from "./appointment";

test("create an appointment", () => {
  const startsAt = new Date();
  const endsAt = new Date();

  // Set the endsAt date to be one day before the startsAt date
  endsAt.setDate(endsAt.getDate() + 1);

  const appointment = new Appointment({
    customer: "John Doe",
    startsAt,
    endsAt,
  });

  // Expect the appointment to be an instance of the Appointment class
  expect(appointment).toBeInstanceOf(Appointment);
  // Expect the appointment to have a customer property
  expect(appointment).toHaveProperty("customer");
  // Expect the appointment to have a startsAt property
  expect(appointment).toHaveProperty("startsAt");
  // Expect the appointment to have an endsAt property
  expect(appointment).toHaveProperty("endsAt");
  // Expect the appointment to have a customer property with the value "John Doe"
  expect(appointment.customer).toBe("John Doe");
});

test("cannot create an appointment with the endsAt date after the startsAt date", () => {
  const startsAt = new Date();
  const endsAt = new Date();

  // Set the endsAt date to be one day before the startsAt date
  endsAt.setDate(endsAt.getDate() - 1);

  // Expect the Appointment constructor to throw an error
  expect(() => {
    const appointment = new Appointment({
      customer: "John Doe",
      startsAt,
      endsAt,
    });
  }).toThrow();
});

test("cannot create an appointment with startsAt before now", () => {
  const startsAt = new Date();
  const endsAt = new Date();

  startsAt.setDate(startsAt.getDate() - 1);
  endsAt.setDate(endsAt.getDate() + 3);

  // Expect the Appointment constructor to throw an error
  expect(() => {
    const appointment = new Appointment({
      customer: "John Doe",
      startsAt,
      endsAt,
    });
  }).toThrow();
});
