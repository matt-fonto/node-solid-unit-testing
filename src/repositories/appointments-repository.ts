import { Appointment } from "../classes/appointment";

export interface AppointmentRepository {
  // here we are defining the methods that will be used by the service
  //   the create method will be used to create an appointment
  // it will receive an appointment object and return a promise of void
  create(appointment: Appointment): Promise<void>;

  //   this method will receive a date and return a promise of appointment, in case there was an overlap, or undefined, in case there wasn't
  findOverlappingAppointment(
    startsAt: Date,
    endsAt: Date
  ): Promise<Appointment | null>;
}
