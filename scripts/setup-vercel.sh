#!/usr/bin/env bash
set -euo pipefail

# Setup script for Vercel deployment
# Links the project to Vercel and extracts credentials for GitHub secrets

echo "=== Vercel Project Setup ==="
echo ""

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
  echo "Error: Vercel CLI is not installed."
  echo "Install it with: npm install -g vercel"
  exit 1
fi

# Run vercel link
echo "Linking project to Vercel..."
echo "(Follow the prompts to select your Vercel account and project)"
echo ""
vercel link

# Check if .vercel/project.json was created
if [ ! -f .vercel/project.json ]; then
  echo ""
  echo "Error: .vercel/project.json was not created. Please retry."
  exit 1
fi

# Extract org and project IDs
ORG_ID=$(python3 -c "import json; print(json.load(open('.vercel/project.json'))['orgId'])")
PROJECT_ID=$(python3 -c "import json; print(json.load(open('.vercel/project.json'))['projectId'])")

echo ""
echo "=== Setup Complete ==="
echo ""
echo "Add these as GitHub repository secrets:"
echo "  Settings → Secrets and variables → Actions → New repository secret"
echo ""
echo "  VERCEL_ORG_ID:     $ORG_ID"
echo "  VERCEL_PROJECT_ID: $PROJECT_ID"
echo "  VERCEL_TOKEN:      (create at https://vercel.com/account/tokens)"
echo ""
echo "After adding secrets, deployments will trigger automatically on:"
echo "  - Push to main → production deployment"
echo "  - Pull request → preview deployment with URL comment"
