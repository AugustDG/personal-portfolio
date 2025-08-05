#!/bin/bash

# Simple Setup Script

echo "🚀 Setting up Development Environment..."

# Create development environment
if [ ! -f .env ]; then
    echo "📋 Creating .env file for development..."
    cp .env.dev .env
    echo "✅ Development environment configured"
fi

# Create necessary directories
mkdir -p data/mongo public/uploads
echo "📁 Created data directories"

# Build and start development services
echo "🐳 Starting development services..."
docker-compose -f docker-compose.dev.yml up --build -d

echo "⏳ Waiting for services..."
sleep 10

# Check if services are running
if docker-compose -f docker-compose.dev.yml ps | grep -q "Up"; then
    echo "✅ Development environment ready!"
    echo ""
    echo "🌐 Available at:"
    echo "   - Portfolio: http://localhost:3000"
    echo "   - TinaCMS Admin: http://localhost:3000/admin"
    echo "   - MongoDB: localhost:27017"
    echo ""
    echo "📝 Commands:"
    echo "   Stop: docker-compose -f docker-compose.dev.yml down"
    echo "   Logs: docker-compose -f docker-compose.dev.yml logs -f"
else
    echo "❌ Setup failed. Check logs: docker-compose -f docker-compose.dev.yml logs"
fi
