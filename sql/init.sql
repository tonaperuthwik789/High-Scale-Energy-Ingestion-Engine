-- Historical tables (append only)
CREATE TABLE IF NOT EXISTS meter_history (
    id SERIAL PRIMARY KEY,
    meter_id VARCHAR(50),
    kwh_consumed_ac NUMERIC,
    voltage NUMERIC,
    timestamp TIMESTAMP
);

CREATE TABLE IF NOT EXISTS vehicle_history (
    id SERIAL PRIMARY KEY,
    vehicle_id VARCHAR(50),
    soc NUMERIC,
    kwh_delivered_dc NUMERIC,
    battery_temp NUMERIC,
    timestamp TIMESTAMP
);

-- Operational hot tables
CREATE TABLE IF NOT EXISTS meter_live (
    meter_id VARCHAR(50) PRIMARY KEY,
    kwh_consumed_ac NUMERIC,
    voltage NUMERIC,
    timestamp TIMESTAMP
);

CREATE TABLE IF NOT EXISTS vehicle_live (
    vehicle_id VARCHAR(50) PRIMARY KEY,
    soc NUMERIC,
    kwh_delivered_dc NUMERIC,
    battery_temp NUMERIC,
    timestamp TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_vehicle_hist_time ON vehicle_history(vehicle_id, timestamp);
CREATE INDEX IF NOT EXISTS idx_meter_hist_time ON meter_history(meter_id, timestamp);
