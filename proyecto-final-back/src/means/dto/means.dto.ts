import { SchemaFactory } from '@nestjs/mongoose';
import { IsInt, IsString } from 'class-validator';
import { Mean } from '../mean.schema';

export class MeansDto {
    @IsInt()
    meanId: number;

    @IsString({ message: 'need select the type of mean'})
    type: string;

    @IsString({ message: 'need to select the name'})
    name: string

    @IsString()
    state: string
}

export const MeanSchema = SchemaFactory.createForClass(Mean);
