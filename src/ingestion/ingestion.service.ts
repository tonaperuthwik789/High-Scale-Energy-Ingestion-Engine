import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { MeterDto } from './dto/meter.dto';
import { VehicleDto } from './dto/vehicle.dto';

@Injectable()
export class IngestionService {
  constructor(@Inject('DATA_SOURCE') private ds: DataSource) {}
  async ingestMeter(data: MeterDto): Promise<{ statusCode: number; data: MeterDto }> {
    await this.ds.query(
      `INSERT INTO meter_history(meter_id,kwh_consumed_ac,voltage,timestamp)
       VALUES($1,$2,$3,$4)`,
      [data.meterId, data.kwhConsumedAc, data.voltage, data.timestamp],
    );

    await this.ds.query(
      `INSERT INTO meter_live(meter_id,kwh_consumed_ac,voltage,timestamp)
       VALUES($1,$2,$3,$4)
       ON CONFLICT (meter_id)
       DO UPDATE SET kwh_consumed_ac=$2, voltage=$3, timestamp=$4`,
      [data.meterId, data.kwhConsumedAc, data.voltage, data.timestamp],
    );

    return { statusCode: 201, data };
  }

  async ingestVehicle(data: VehicleDto): Promise<{ statusCode: number; data: VehicleDto }>{
    await this.ds.query(
      `INSERT INTO vehicle_history(vehicle_id,soc,kwh_delivered_dc,battery_temp,timestamp)
       VALUES($1,$2,$3,$4,$5)`,
      [data.vehicleId, data.soc, data.kwhDeliveredDc, data.batteryTemp, data.timestamp],
    );

    await this.ds.query(
      `INSERT INTO vehicle_live(vehicle_id,soc,kwh_delivered_dc,battery_temp,timestamp)
       VALUES($1,$2,$3,$4,$5)
       ON CONFLICT(vehicle_id)
       DO UPDATE SET soc=$2,kwh_delivered_dc=$3,battery_temp=$4,timestamp=$5`,
      [data.vehicleId, data.soc, data.kwhDeliveredDc, data.batteryTemp, data.timestamp],
    );

    return { statusCode: 201, data };
  }
}
