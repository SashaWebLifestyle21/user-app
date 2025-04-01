import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('avatar'))
  @Post()
  create(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.userService.create(createUserDto, image);
  }

  @HttpCode(200)
  @Get()
  findAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.userService.findAll(+page, +limit);
  }

  @HttpCode(200)
  @Get('/length')
  getLengthUsers() {
    return this.userService.getLengthUsers();
  }

  @HttpCode(200)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('avatar'))
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    return this.userService.update(id, updateUserDto, image);
  }

  @HttpCode(200)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
