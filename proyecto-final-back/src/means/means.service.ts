import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MeansDto } from './dto/means.dto';
import { Mean, MeanDocument } from './mean.schema';

@Injectable()
export class MeansService {
    constructor(
        @InjectModel(Mean.name) private meanModel: Model<MeanDocument>) { }

    async getMeans(): Promise<Mean[]> {
        return await this.meanModel.find()
    }

    async getMean(id: number): Promise<Mean> {
        return await this.meanModel.findOne({ id })
    }

    // async insertMean(body: MeansDto): Promise<Mean[]>{

    // }

    async updateMean(id: number, body: MeansDto): Promise<Mean[]> {
        await this.meanModel.updateOne({ id }, { $set: body })

        return this.getMeans()
    }
}
