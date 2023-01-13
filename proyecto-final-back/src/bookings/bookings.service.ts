import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking, BookingDocument } from './booking.schema';
import { BookingsDto } from './dto/bookings.dto/bookings.dto';

@Injectable()
export class BookingsService {
    constructor(
        @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>,
    ) { }
    async getBookings(): Promise<Booking[]> {
        return await this.bookingModel.find();
    }
    async getBooking(id: number): Promise<Booking[]>{
        return await this.bookingModel.findOne({id})
    }
    async create(body: BookingsDto){
        const bookings: any = await this.getBookings();
        const id: number = bookings.length > 0 ? bookings[bookings.length - 1].id + 1 :1;
        const newBody = { id, ...body};
        console.log(newBody);
        await this.bookingModel.collection.insertOne(newBody);
        return await this.bookingModel.find()
        
    }
    async update(id:number, body: any) {
        const Booking = {id: id, body: body}
        await this.bookingModel.updateOne({id:id}, {"$set":{timeFinish: body.timeFinish, timeInic: body.timeInic, emails: body.emails, means: body.means, timeBooking: body.timeBooking}})
        return await this.bookingModel.find()
    }
    async delete(id: number): Promise<any> {
            await this.bookingModel.deleteOne({id:id})
    
            return this.getBookings()
    }
}
