import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { Room } from './room.schema';
import { RoomsService } from './rooms.service';

@Controller('rooms')
export class RoomsController {
    constructor(private readonly roomsService: RoomsService){}
    @Get()
    async getRooms(): Promise<Room[]>{
        return await this.roomsService.getRooms();
    }
    @Get('roomId')
    getRoom(@Param('roomId') roomId): Promise<Room>{
        return this.roomsService.getRoom(roomId)
    }

    @Put()
    async update(@Param ('id') id: number, @Body() body: any): Promise<any>{
        return await this.roomsService.update(id,body)
    }
}
