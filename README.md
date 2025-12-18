# CoIEP Landing Page

Static landing page for CoIEP (Collaborative IEP Platform) deployed on Vercel.

## Overview

This is a separate repository containing the static landing page for coiep.com. The main application is hosted at app.coiep.com.

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Deployment

This site is deployed automatically to Vercel when changes are pushed to the main branch.

### Environment Variables

Set these in your Vercel project settings:

- `NEXT_PUBLIC_APP_URL` - URL of the main application (default: https://app.coiep.com)

### Custom Domain

Configure `coiep.com` as the custom domain in Vercel project settings.

## Architecture

- **coiep.com** - Static landing page (this repo, Vercel)
- **app.coiep.com** - Main application with authentication (uw-coiep repo, Kubernetes)
- **api.coiep.com** - Backend API (uw-coiep repo, Kubernetes)
