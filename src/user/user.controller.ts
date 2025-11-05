import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  HttpStatus,
  HttpCode,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from './auth/auth.guard';
import {
  LoggedInUser,
  type RequestWithUser,
} from './decorators/user.decorator';
import { CustomBody } from './decorators/custom-body.decorator';
import { UserRole } from './entities/user.entities';
import { Roles } from './decorators/role.decorator';
import { RolesGuard } from './auth/roles.guard';
import { Auth } from './decorators/auth.decorator';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  // IF we only use @auth () decorators it will use auth guard by default but
  @Auth(UserRole.USER)
  getAllUsers(@Req() req: RequestWithUser) {
    const User = req.user;
    console.log('loggedInUser', User);
    return this.usersService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  getUserById(@LoggedInUser('email') User, @Param('id') id: string) {
    console.log('logged in User', User);
    return this.usersService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('login')
  login(
    @CustomBody('email') email: string,
    @CustomBody('password') password: string,
  ): Promise<{ token: string }> {
    return this.usersService.login(email, password);
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
// admin user register login pass the token pass it should not give a forbidden  error.
