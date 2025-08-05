#!/bin/bash

# Simple Development Deployment

echo "🛠️ Starting development environment..."

# Use development .env
if [ ! -f .env ]; then
    echo "📝 Setting up development environment..."
    cp .env.dev .env
fi

# Create directories
mkdir -p  public/uploads

# Build and start
echo "📦 Building and starting development services..."
docker-compose -f docker-compose.dev.yml up --build -d

# Check status
if docker-compose -f docker-compose.dev.yml ps | grep -q "Up"; then
    echo "✅ Development environment ready!"
    echo ""
    echo "🌐 Application: http://localhost:3000"
    echo "📊 TinaCMS Admin: http://localhost:3000/admin"
    echo "🗄️ MongoDB: mongodb://localhost:27017"
    echo ""
    echo "📋 Commands:"
    echo "   Logs: docker-compose -f docker-compose.dev.yml logs -f"
    echo "   Stop: docker-compose -f docker-compose.dev.yml down"
    echo "   Restart: docker-compose -f docker-compose.dev.yml restart app"
else
    echo "❌ Failed to start. Check logs:"
    docker-compose -f docker-compose.dev.yml logs
fi
