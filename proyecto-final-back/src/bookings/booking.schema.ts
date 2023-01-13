import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type BookingDocument = Booking & Document

@Schema()
export class Booking{
    @Prop({ unique: true, required: true})
    id: number;

    @Prop({required:true})
    timeBooking: number;

    @Prop({ required: true})
    emails: string[];

    @Prop({required:true})
    timeInic: string;

    @Prop({required:true})
    timeFinish: string;

    @Prop({required: true})
    roomId: string;

    @Prop({required:true})
    means: string[];

}

export const BookingSchema = SchemaFactory.createForClass(Booking);