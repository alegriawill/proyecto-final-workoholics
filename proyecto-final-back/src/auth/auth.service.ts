import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from 'src/users/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtservice: JwtService,
  ) {}
  async validateUser(email: string, password: string): Promise<any> {
    const users: Array<User> = await this.usersService.getUser(email);
    let user: User
    if (users.length == 0) {
      return null;
    } else {
      user = users[0];
    
      const bcs = bcrypt.compareSync(password, user.password);
      if (user && bcs) {
        const { password, ...result } = user; 
        return result;
      }
      return null;
    }
   }
  async login(user: any) {
    let u = await this.validateUser(user.email, user.password)
    if(u){
      const payload = { email: user.email, sub: user.userID };
      return {
        access_token: this.jwtservice.sign(payload),u
      };
    } else {
      return {msg: "Usuario o contraseña incorrectos"}
    }
  }
}
