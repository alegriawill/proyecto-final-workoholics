import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { MeansDto } from './dto/means.dto';
import { Mean } from './mean.schema';
import { MeansService } from './means.service';

@Controller('means')
export class MeansController {
    constructor(private readonly meansService: MeansService) { }
    @Get()
    getMeans(): Promise<Mean[]> {
        return this.meansService.getMeans();
    }
    @Get(':meanId')
    getMeanForId(@Param('meanId') meanId): Promise<Mean> {
        return this.meansService.getMean(meanId);
    }
    // @Post()
    // create(@Body() body: MeansDto): Promise<Mean[]>{
    //     return this.meansService.create(body);
    // }
    @Put(':id')
    update(@Param('id') id: number, @Body() body: any): void {
        this.meansService.updateMean(id, body)
    }
    // @Delete(':id')
    // deleteOne(@Param('id') id: string): void{
    //     this.meansService.delete(id)
    // }
}

