import { describe, expect, it } from "vitest";
import { CreateAppointment } from "./create-appointments";
import { Appointment } from "../classes/appointment";
import { getFutureDate } from "../tests/utils/get-future-date";
import { InMemoryAppointmentsRepository } from "../repositories/in-memory/in-memory-appointments-repository";

describe("create an appointment", () => {
  // Test one: create an appointment
  it("should be able to create an appointment", () => {
    // appointmentsRepository is an instance of InMemoryAppointmentsRepository which allows us to simulate a database
    const appointmentsRepository = new InMemoryAppointmentsRepository();
    // createAppointment is an instance of CreateAppointment which allows us to create an appointment
    const createAppointment = new CreateAppointment(appointmentsRepository);

    const startsAt = getFutureDate("2022-08-10");
    const endsAt = getFutureDate("2022-08-11");

    // Expect the createAppointment.execute method to return an instance of the Appointment class
    expect(
      createAppointment.execute({
        customer: "John Doe",
        startsAt,
        endsAt,
      })
    ).resolves.toBeInstanceOf(Appointment);
  });

  // Test two: cannot create overlapping appointments
  it("should not be able to create overlapping appointments", async () => {
    // appointmentsRepository is an instance of InMemoryAppointmentsRepository which allows us to simulate a database
    const appointmentsRepository = new InMemoryAppointmentsRepository();
    const createAppointment = new CreateAppointment(appointmentsRepository);

    const startsAt = getFutureDate("2022-08-10");
    const endsAt = getFutureDate("2022-08-15");

    // Create an appointment
    await createAppointment.execute({
      customer: "John Doe",
      startsAt,
      endsAt,
    });

    // Try to create an overlapping appointment, which should throw an error
    try {
      // appointment one
      await createAppointment.execute({
        customer: "John Doe",
        startsAt: getFutureDate("2022-08-14"),
        endsAt: getFutureDate("2022-08-18"),
      });

      // appointment two
      await createAppointment.execute({
        customer: "John Doe",
        startsAt: getFutureDate("2022-08-09"),
        endsAt: getFutureDate("2022-08-12"),
      });
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe("There is an overlapping appointment");
    }
  });
});
