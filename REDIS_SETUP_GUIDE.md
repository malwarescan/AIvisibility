# Redis Setup Guide for Queue System

## Overview
Successfully installed and configured Redis for the authority analysis queue system. Redis is now running and ready to handle background job processing.

## Installation Status
✅ **Redis Installed**: Version 8.0.3 via Homebrew
✅ **Redis Service**: Started and running as background service
✅ **Connection Test**: Redis responding to ping (PONG)
✅ **Queue Ready**: Ready for BullMQ queue processing

## Installation Commands Used

### macOS (Homebrew)
```bash
# Install Redis
brew install redis

# Start Redis service
brew services start redis

# Test connection
redis-cli ping
```

### Ubuntu/WSL (Alternative)
```bash
# Install Redis
sudo apt-get update
sudo apt-get install redis-server

# Start Redis service
sudo systemctl start redis

# Enable auto-start
sudo systemctl enable redis

# Test connection
redis-cli ping
```

### Windows (WSL2)
```bash
# Same as Ubuntu commands above
sudo apt-get install redis-server
sudo systemctl start redis
redis-cli ping
```

## Redis Configuration

### Default Settings
- **Port**: 6379 (default)
- **Host**: 127.0.0.1 (localhost)
- **Service**: Running as background service
- **Auto-start**: Enabled (will start on system boot)

### Connection Details
```bash
# Redis CLI
redis-cli

# Connection string for applications
redis://localhost:6379
```

## Queue System Integration

### Environment Variables
The queue system will automatically use these Redis settings:
- **Development**: `redis://localhost:6379`
- **Production**: Set `REDIS_URL` environment variable

### BullMQ Configuration
```typescript
// Automatic fallback to localhost:6379
const connection = new Redis(process.env.REDIS_URL || 'redis://localhost:6379')
```

## Testing the Queue System

### 1. Start the Worker
```bash
curl -X POST http://localhost:3000/api/start-worker
```

### 2. Submit Analysis Job
```bash
curl -X POST http://localhost:3000/api/analyze-website \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com"}'
```

### 3. Check Job Status
```bash
curl "http://localhost:3000/api/analyze-website?jobId=YOUR_JOB_ID"
```

## Redis Management Commands

### Service Management
```bash
# Start Redis
brew services start redis

# Stop Redis
brew services stop redis

# Restart Redis
brew services restart redis

# Check status
brew services list | grep redis
```

### Redis CLI Commands
```bash
# Connect to Redis
redis-cli

# Check Redis info
redis-cli info

# Monitor Redis commands
redis-cli monitor

# Check memory usage
redis-cli info memory

# List all keys
redis-cli keys "*"

# Clear all data
redis-cli flushall
```

### Queue Monitoring
```bash
# Check queue keys
redis-cli keys "*bull*"

# Check specific queue
redis-cli llen bull:authority-analysis:wait

# Monitor queue activity
redis-cli monitor | grep bull
```

## Troubleshooting

### Common Issues

#### 1. Redis Connection Refused
```bash
# Check if Redis is running
brew services list | grep redis

# Start Redis if not running
brew services start redis

# Check Redis logs
tail -f /opt/homebrew/var/log/redis.log
```

#### 2. Port Already in Use
```bash
# Check what's using port 6379
lsof -i :6379

# Kill process if needed
sudo kill -9 <PID>
```

#### 3. Permission Issues
```bash
# Fix Redis permissions
sudo chown -R $(whoami) /opt/homebrew/var/log/redis.log
sudo chown -R $(whoami) /opt/homebrew/var/run/redis.pid
```

### Debug Commands
```bash
# Test Redis connection
redis-cli ping

# Check Redis version
redis-cli --version

# Test with specific host/port
redis-cli -h 127.0.0.1 -p 6379 ping
```

## Performance Monitoring

### Redis Info
```bash
# Get Redis statistics
redis-cli info

# Monitor memory usage
redis-cli info memory

# Check client connections
redis-cli info clients
```

### Queue Metrics
```bash
# Count jobs in queue
redis-cli llen bull:authority-analysis:wait

# Count completed jobs
redis-cli llen bull:authority-analysis:completed

# Count failed jobs
redis-cli llen bull:authority-analysis:failed
```

## Production Considerations

### 1. Security
- **Authentication**: Enable Redis password in production
- **Network**: Bind to specific IP addresses
- **Firewall**: Configure firewall rules

### 2. Performance
- **Memory**: Monitor memory usage
- **Persistence**: Configure RDB/AOF persistence
- **Replication**: Set up Redis replication for HA

### 3. Monitoring
- **Health Checks**: Regular Redis health checks
- **Metrics**: Monitor queue performance
- **Alerts**: Set up alerts for queue issues

## Next Steps

1. **Test Queue System**: Submit test analysis jobs
2. **Monitor Performance**: Watch queue processing
3. **Scale Testing**: Test with multiple concurrent jobs
4. **Production Setup**: Configure for production deployment

## Files Created/Modified

- **Redis Installation**: Completed via Homebrew
- **Redis Service**: Started and configured
- **REDIS_SETUP_GUIDE.md**: This documentation file

## Status
✅ **Complete**: Redis installed and configured
✅ **Running**: Redis service active
✅ **Tested**: Connection verified (PONG response)
✅ **Ready**: Queue system ready for testing
✅ **Documented**: Comprehensive setup guide provided 