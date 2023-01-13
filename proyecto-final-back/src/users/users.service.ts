import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersDto } from './dto/users.dto';
import { User, UserDocument } from './user.schema';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
   constructor(
      @InjectModel(User.name)
      private userModel: Model<UserDocument>,
   ) { }
   async getUsers(): Promise<User[]> {
      return await this.userModel.find();
   }

   async getUser(email: string): Promise<Array<User>>{
      let get= await this.userModel.find({ email });
      return get
   }
   
   
   async create(body: UsersDto) {
      const newUser: any = await this.getUser(body.email);
      if(newUser.length == 0){
         const hashPaswword = await bcrypt.hash(body.password, 10);
         body.password = hashPaswword;
         await this.userModel.create(body);
         return {msg: "Usuario creado"}
      }
      else{
         return {msg: "El usuario ya existe"}
      }
   }

   
   
}
