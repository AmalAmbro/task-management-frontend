#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "🔧 Installing npm packages..."
npm install

# Create .env from .env.sample if not exists
if [ ! -f .env ]; then
  echo "📝 Creating .env file from .env.sample..."
  cp .env.sample .env
else
  echo "✅ .env file already exists, skipping copy."
fi

echo "✅ React project setup complete!"
