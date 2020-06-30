import { startOfHour, parseISO} from "date-fns";
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/appointment';
import AppointmentRepository from '../repositories/AppointmentRepository';
import AppError from '../errors/AppError';

interface RequestDTO {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService  {

  public async execute({provider_id, date }: RequestDTO): Promise<Appointment> {
    const appointmentRepository = getCustomRepository(AppointmentRepository);

    const appointmentDate = startOfHour(date);

    if (await appointmentRepository.findByDate(appointmentDate)){
      throw new AppError('this appointment already booked');
    }

    const appointment = appointmentRepository.create({provider_id, date: appointmentDate});

    await appointmentRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
