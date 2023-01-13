import { SchemaFactory } from "@nestjs/mongoose";
import { IsInt, IsString } from "class-validator";
import { Booking } from "src/bookings/booking.schema";

export class BookingsDto {
    @IsInt({})
    id: number;

    @IsInt({})
    timeBooking: number;

    @IsString({})
    emails:string[];

    @IsInt({})
    timeInic: string;

    @IsInt({})
    timeFinish: string;

    @IsString({})
    roomId: string;

    @IsString({})
    means:string[];
}

export const BookingSchema = SchemaFactory.createForClass(Booking)
