import { Appointment } from "../classes/appointment";
import { AppointmentRepository } from "../repositories/appointments-repository";

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
  // we pass the appointmentsRepository as a dependency to the constructor because we will need it to create an appointment
  constructor(
    private appointmentsRepository: AppointmentRepository // this is the dependency injection
  ) {}

  async execute({
    customer,
    startsAt,
    endsAt,
  }: CreateAppointmentRequest): Promise<CreateAppointmentResponse> {
    // here we are checking if there is an appointment overlapping the one we are trying to create
    const overlappingAppointment =
      await this.appointmentsRepository.findOverlappingAppointment(
        startsAt,
        endsAt
      );

    // if there is an overlapping appointment, we throw an error
    if (overlappingAppointment)
      throw new Error("There is an overlapping appointment");

    // here we are creating an appointment
    const appointment = new Appointment({
      customer,
      startsAt,
      endsAt,
    });

    // here we are saving the appointment
    await this.appointmentsRepository.create(appointment);

    // here we are returning the appointment
    return appointment;
  }
}
