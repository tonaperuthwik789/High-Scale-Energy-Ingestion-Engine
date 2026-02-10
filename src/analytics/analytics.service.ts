import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class AnalyticsService {
  constructor(@Inject('DATA_SOURCE') private ds: DataSource) {}

  async performance(vehicleId: string) {
    // Use subqueries instead of joining on exact timestamps (which often won't match)
    // and use COALESCE so aggregates return 0 instead of NULL when no rows exist.
    return this.ds.query(
      `SELECT
        (SELECT COALESCE(SUM(m.kwh_consumed_ac), 0) FROM meter_history m WHERE m.timestamp > NOW() - interval '24 hours') AS total_ac,
        (SELECT COALESCE(SUM(v.kwh_delivered_dc), 0) FROM vehicle_history v WHERE v.vehicle_id = $1 AND v.timestamp > NOW() - interval '24 hours') AS total_dc,
        (SELECT COALESCE(AVG(v.battery_temp), 0) FROM vehicle_history v WHERE v.vehicle_id = $1 AND v.timestamp > NOW() - interval '24 hours') AS avg_temp,
        ( (SELECT COALESCE(SUM(v.kwh_delivered_dc), 0) FROM vehicle_history v WHERE v.vehicle_id = $1 AND v.timestamp > NOW() - interval '24 hours')
          / NULLIF((SELECT COALESCE(SUM(m.kwh_consumed_ac), 0) FROM meter_history m WHERE m.timestamp > NOW() - interval '24 hours'), 0)
        ) AS efficiency
      `,
      [vehicleId],
    );
  }
}
