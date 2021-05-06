#!/bin/bash
psql -U postgres -c "CREATE DATABASE indexes" # Create database
psql -U postgres -d indexes -a -f /database-schema.sql # Execute SQL with database schema