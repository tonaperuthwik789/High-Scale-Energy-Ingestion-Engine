# Data Processing System

## Overview
This system processes approximately **14.4 million records per day** (~166 records per second).  
The architecture is designed for scalability, reliability, and efficient data correlation across multiple data streams.

---

## Architecture

The system follows a **microservice-based architecture** deployed using Docker containers.

Main components:

- **API Service**
  - Receives incoming meter data
  - Performs validation and preprocessing

- **Processing Service**
  - Handles data correlation and transformation
  - Ensures data consistency across sources

- **Database Layer**
  - PostgreSQL used for structured storage
  - Indexed tables to support high-volume queries

---

## Data Correlation Strategy

Data correlation is performed using:

- Unique identifiers (Meter ID, Timestamp)
- Batch processing pipelines
- Indexed joins between:
  - meter readings
  - meter history
  - customer metadata

Correlation workflow:

1. Incoming records are validated.
2. Records are grouped by meter ID.
3. Matching historical data is fetched using indexed queries.
4. Correlated results are stored in the processed data tables.

This ensures fast lookups and accurate time-series correlation.

---

## Handling 14.4 Million Records Daily

To efficiently process large data volumes, the system uses:

- **Database indexing** on meter_id and timestamp
- **Batch inserts** instead of single-row inserts
- **Horizontal scaling** via containerized services
- **Connection pooling** for optimized database usage
- **Asynchronous processing** using queues to avoid API blocking

Estimated throughput:
- ~166 records per second sustained load
- Scalable to higher loads by increasing worker instances

---

## Scalability

The architecture supports scaling by:

- Adding additional processing workers
- Increasing database read replicas
- Deploying services behind load balancers

This allows the system to maintain performance even with increasing data volumes.

---

## Future Improvements

- Partitioned database tables for faster large-scale queries
- Stream processing pipelines
- Real-time monitoring dashboards