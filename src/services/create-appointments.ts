import { Appointment } from "../classes/appointment";

// this is the input, composed of a customer and a date
interface CreateAppointmentRequest {
  customer: string;
  startsAt: Date;
  endsAt: Date;
}

// this is the output, composed of an appointment, the class we created
type CreateAppointmentResponse = Appointment;

// every useCase or Service will have only one method, and it will be called execute
// every useCase or Service will have an input and an output
export class CreateAppointment {
  async execute({
    customer,
    startsAt,
    endsAt,
  }: CreateAppointmentRequest): Promise<CreateAppointmentResponse> {
    const appointment = new Appointment({
      customer,
      startsAt,
      endsAt,
    });

    return appointment;
  }
}
