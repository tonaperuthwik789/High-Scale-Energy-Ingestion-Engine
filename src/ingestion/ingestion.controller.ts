import { Body, Controller, Post, HttpCode } from '@nestjs/common';
import { MeterDto } from './dto/meter.dto';
import { VehicleDto } from './dto/vehicle.dto';
import { IngestionService } from './ingestion.service';
@Controller('v1/Ingestion')
export class IngestionController {
  constructor(private service: IngestionService) {}

  @Post('meter')
  @HttpCode(201)
  ingestMeter(@Body() body: MeterDto) {
    return this.service.ingestMeter(body);
  }

  @Post('vehicle')
  @HttpCode(201)
  ingestVehicle(@Body() body: VehicleDto) {
    return this.service.ingestVehicle(body);
  }
}
