import { SchemaFactory } from '@nestjs/mongoose';
import{ IsInt, IsString } from 'class-validator'
import { Room } from '../room.schema';

export class RoomsDto {
    @IsInt()
    roomId: string;

    @IsString()
    state: string;

    @IsInt()
    ability: number
}
export const RoomSchema = SchemaFactory.createForClass(Room);
