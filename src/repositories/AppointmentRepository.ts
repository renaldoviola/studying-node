import { EntityRepository, Repository } from 'typeorm';

import Appointment from '../models/appointment';

@EntityRepository(Appointment)
class AppointmentRepository extends Repository<Appointment>{

  public async findByDate(date: Date): Promise<Appointment | null> {

    const findApointment = await this.findOne({
      where: { date },
    })
    return findApointment || null;
  }
}

export default AppointmentRepository;
