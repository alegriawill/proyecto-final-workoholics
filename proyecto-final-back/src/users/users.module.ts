import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { User, UserSchema } from './user.schema';
import { Mean, MeanSchema } from 'src/means/mean.schema';
import { Room, RoomSchema } from 'src/rooms/room.schema';


@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],

  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
