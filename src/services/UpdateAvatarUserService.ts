import { getRepository} from 'typeorm';
import User from '../models/user';
import AppError from '../errors/AppError';
import uploadConfig from '../config/upload';
import path from 'path';
import fs from 'fs';

interface Request {
  user_id: string;
  avatarFileName: string;
}

class UpdateAvatarService {
  public async execute({ user_id, avatarFileName}: Request): Promise<User>{
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if(!user){
      throw new AppError('User not authenticated', 401);
    }

    if(user.avatar){
      // Deletar avatar já existente.

      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if(userAvatarFileExists){
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFileName;
    await usersRepository.save(user);

    return user;
  }
}

export default UpdateAvatarService;
