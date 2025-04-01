import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { FileService } from 'src/file/file.service';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    private fileService: FileService,
    private prisma: PrismaService,
  ) {}

  create(createUserDto: CreateUserDto, image: Express.Multer.File) {
    if (!image) throw new BadRequestException('Нету фото пользователя');

    const avatarPath = this.fileService.saveFile(image);
    const newUser = {
      ...createUserDto,
      avatar: avatarPath,
      growth: parseFloat(createUserDto.growth),
      weight: parseFloat(createUserDto.weight),
    };
    return this.prisma.user.create({
      data: newUser,
    });
  }

  async findAll(page: number, limit: number) {
    return this.prisma.user.findMany({
      take: limit,
      skip: (page - 1) * limit,
    });
  }

  async getLengthUsers() {
    return (await this.prisma.user.findMany()).length;
  }

  async findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    image?: Express.Multer.File,
  ) {
    const currentUser = await this.findOne(id);
    if (!currentUser) throw new BadRequestException('Пользователь не найден');

    const updatedUser = {
      ...updateUserDto,
      growth: updateUserDto.growth
        ? parseFloat(updateUserDto.growth)
        : currentUser.growth,
      weight: updateUserDto.weight
        ? parseFloat(updateUserDto.weight)
        : currentUser.weight,
      avatar: image ? this.fileService.saveFile(image) : currentUser.avatar,
    };

    return this.prisma.user.update({
      where: {
        id,
      },
      data: updatedUser,
    });
  }

  async remove(id: string) {
    const user = await this.findOne(id);

    if (!user) {
      console.log('user ', user);
      throw new BadRequestException('Пользователь не найден');
    }
    try {
      await this.prisma.user.delete({
        where: { id },
      });
      this.fileService.removeFile(user.avatar);

      return true;
    } catch (error) {
      throw new InternalServerErrorException('Ошибка при удалении');
    }
  }
}
