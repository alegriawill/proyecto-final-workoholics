import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { RoomsController } from './rooms/rooms.controller';
import { RoomsService } from './rooms/rooms.service';
import { StatsController } from './stats/stats.controller';
import { StatsService } from './stats/stats.service';
import { MeansController } from './means/means.controller';
import { MeansService } from './means/means.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import * as dotenv from 'dotenv'
import { Mean, MeanSchema } from './means/mean.schema';
import { Room, RoomSchema } from './rooms/room.schema';
import { Stats } from 'fs';
import { BookingsService } from './bookings/bookings.service';
import { BookingsController } from './bookings/bookings.controller';
import { Booking, BookingSchema } from './bookings/booking.schema';
import { User, UserSchema } from './users/user.schema';

dotenv.config()

@Module({
  imports: [
    MongooseModule.forRoot(process.env.CONNECTION_STRING),
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Mean.name,
        schema: MeanSchema
      },
      {
        name: Room.name,
        schema: RoomSchema
      },
      {
        name: Booking.name,
        schema: BookingSchema
      },
      // {
      //   name: Stats.name,
      //   schema: StatSchema
      // },
    ]),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController, UsersController, RoomsController, StatsController, MeansController, BookingsController],
  providers: [AppService, UsersService, RoomsService, StatsService, MeansService, BookingsService],
})
export class AppModule {}


