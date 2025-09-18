#!/bin/bash

# Setup Git repository for Essential Goods Price Tracker
echo "Setting up Git repository..."

# Initialize Git repository
git init

# Add remote origin
git remote add origin https://github.com/Sok-Phal/prompt-project.git

# Add all files to staging
git add .

# Create initial commit
git commit -m "Initial commit: Essential Goods Price Tracker Phase 1

- Complete project structure with React frontend and Node.js backend
- Backend API with full CRUD endpoints for markets and items
- Comprehensive mock data (5 markets, 10 items each)
- Bilingual support (English-Khmer) using i18next
- Home page with price overview table and color-coded pricing
- Search functionality and responsive design
- TailwindCSS styling and React Router navigation
- Ready for Phase 2 development"

# Set main branch
git branch -M main

# Push to remote repository
git push -u origin main

echo "Git repository setup complete!"
echo "Repository URL: https://github.com/Sok-Phal/prompt-project.git"
