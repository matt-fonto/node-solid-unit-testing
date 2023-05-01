import { describe, expect, it } from "vitest";
import { CreateAppointment } from "./create-appointments";
import { Appointment } from "../classes/appointment";

describe("create an appointment", () => {
  it("should be able to create an appointment", () => {
    const createAppointment = new CreateAppointment();

    const startsAt = new Date();
    const endsAt = new Date();

    startsAt.setDate(startsAt.getDate() + 1);
    endsAt.setDate(endsAt.getDate() + 2);

    expect(
      createAppointment.execute({
        customer: "John Doe",
        startsAt,
        endsAt,
      })
    ).resolves.toBeInstanceOf(Appointment);
  });
});
