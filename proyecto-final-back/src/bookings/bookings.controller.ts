import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Booking } from './booking.schema';
import { BookingsService } from './bookings.service';
import { BookingsDto } from './dto/bookings.dto/bookings.dto';

@Controller('bookings')
export class BookingsController {
    constructor(private readonly bookingService: BookingsService){}
    @Get()
    getBookings(): Promise<Booking[]>{
        return this.bookingService.getBookings();
    }
    @Get(':id')
    async getBooking(@Param('id') id): Promise<Booking[]>{
        return  await this.bookingService.getBooking(id);
    }
    @Post()
    async create(@Body() body: BookingsDto): Promise<Booking[]> {
        return await this.bookingService.create(body);
    }
    @Put(':id')
    async update(@Param('id') id: number, @Body() body: any): Promise<any>{
        return await this.bookingService.update(id,body);
    }
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<any>{
        return await this.bookingService.delete(id);
    }

}
