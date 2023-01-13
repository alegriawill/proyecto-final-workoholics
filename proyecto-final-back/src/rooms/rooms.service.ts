import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoomsDto } from './dto/rooms.dto';
import { Room, RoomDocument } from './room.schema';


@Injectable()
export class RoomsService {
    constructor(@InjectModel(Room.name) private roomModel: Model<RoomDocument>
    ) {}

    async getRooms(): Promise<Room[]> {
        return await this.roomModel.find()
    }
    async getRoom(id: number): Promise<Room>{
        return await this.roomModel.findOne({id})
    }

    async update(id: number, body: RoomsDto): Promise<Room[]>{
        await this.roomModel.updateOne({id}, {$set: body})

        return this.getRooms()
    }
}
