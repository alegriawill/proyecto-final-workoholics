import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type MeanDocument = Mean & Document;

@Schema()
export class Mean {
    @Prop({unique:true, required:true})
    meanId: number;

    @Prop({required:true})
    type:string;

    @Prop({unique:true, required:true})
    name:string;

    @Prop({required:true})
    state:string
}

export const MeanSchema = SchemaFactory.createForClass(Mean)


