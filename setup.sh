#!/bin/bash
# ============================================
# CeramicsIQ Site — One-Time Setup Script
# ============================================
# Run this ONCE on your computer to set up
# the project, push to GitHub, and go live.
#
# Prerequisites:
#   1. Install Node.js: https://nodejs.org (LTS version)
#   2. Install Git: https://git-scm.com
#   3. Have your GitHub account ready (CeramicsIQ)
#
# Usage:
#   cd ceramicsiq-site
#   chmod +x setup.sh
#   ./setup.sh
# ============================================

echo ""
echo "🏺 CeramicsIQ Site Setup"
echo "========================"
echo ""

# Step 1: Install dependencies
echo "📦 Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ npm install failed. Make sure Node.js is installed."
    echo "   Download from: https://nodejs.org"
    exit 1
fi
echo "✅ Dependencies installed"
echo ""

# Step 2: Test the build
echo "🔨 Testing build..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Build failed. Check the error messages above."
    exit 1
fi
echo "✅ Build successful"
echo ""

# Step 3: Initialize git and push to GitHub
echo "📡 Setting up Git..."
git init
git add -A
git commit -m "Initial commit: CeramicsIQ editorial site"
git branch -M main
git remote add origin https://github.com/CeramicsIQ/ceramicsiq-site.git
echo ""
echo "🚀 Pushing to GitHub..."
echo "   (You'll be prompted for your GitHub username and password/token)"
echo ""
git push -u origin main

if [ $? -ne 0 ]; then
    echo ""
    echo "⚠️  Push failed. You may need a Personal Access Token:"
    echo "   1. Go to: github.com/settings/tokens"
    echo "   2. Generate new token (classic)"
    echo "   3. Check 'repo' scope"
    echo "   4. Use the token as your password when prompted"
    echo ""
    echo "   Then retry: git push -u origin main"
    exit 1
fi

echo ""
echo "✅ Code is on GitHub!"
echo ""
echo "============================================"
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "  • Deploy: Connect github.com/CeramicsIQ/ceramicsiq-site"
echo "    to Vercel (vercel.com) or Netlify (netlify.com)"
echo "  • Add content: Log into ceramics-iq.ghost.io/ghost"
echo "  • Preview locally: npm run dev (then open localhost:3000)"
echo "============================================"
