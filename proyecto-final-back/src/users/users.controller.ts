import {
    Body,
    Controller,
    Get,
    Post,
    Request,
    UseGuards,
  } from '@nestjs/common';
  import { LocalAuthGuard } from 'src/auth/local-auth.guard';
  import { UsersDto } from './dto/users.dto';
  import { User } from './user.schema';
  import { UsersService } from './users.service';
  import { AuthService } from 'src/auth/auth.service';
  
  @Controller('users')
  export class UsersController {
    constructor(
      private readonly usersService: UsersService,
      private readonly authService: AuthService,
    ) {}
    @Get()
    async getUsers(): Promise<User[]> {
      return await this.usersService.getUsers();
    }
  
    @Post()
    async create(@Body() body: UsersDto) {
      return await this.usersService.create(body);
    }
  
    // @UseGuards(LocalAuthGuard)
    @Post('/login')
    async getUser(@Body() body): Promise<any> {
      return await this.authService.login(body);
    }
  }
  