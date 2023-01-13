import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose'

export type RoomDocument = Room & Document
@Schema()
export class Room {
    @Prop({unique: true, required: true})
    roomId: string;

    @Prop({required: true})
    state: string;

    @Prop({required: true})
    ability: number;
}

export const RoomSchema = SchemaFactory.createForClass(Room)
