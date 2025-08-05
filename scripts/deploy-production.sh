#!/bin/bash

# Simple Production Deployment

echo "🚀 Starting production deployment..."

# Check if production .env exists
if [ ! -f .env ]; then
    echo "📋 Creating production .env from template..."
    cp .env.prod .env
    echo "⚠️  IMPORTANT: Edit .env with your production credentials!"
    echo "   Required: MONGO_PASSWORD, NEXTAUTH_SECRET, GitHub settings, TinaCMS tokens"
    read -p "Press Enter after updating .env file..."
fi

# Build and start production services
echo "📦 Building production services..."
docker-compose -f docker-compose.prod.yml build --no-cache

echo "� Starting production services..."
docker-compose -f docker-compose.prod.yml up -d

# Check deployment
if docker-compose -f docker-compose.prod.yml ps | grep -q "Up"; then
    echo "✅ Production deployment successful!"
    echo ""
    echo "🌐 Application available at: http://localhost:3000"
    echo "📊 TinaCMS Admin at: http://localhost:3000/admin"
    echo ""
    echo "� Commands:"
    echo "   Stop: docker-compose -f docker-compose.prod.yml down"
    echo "   Logs: docker-compose -f docker-compose.prod.yml logs -f"
    echo "   Status: docker-compose -f docker-compose.prod.yml ps"
else
    echo "❌ Deployment failed. Check logs:"
    docker-compose -f docker-compose.prod.yml logs
fi
