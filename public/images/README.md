# Image and Video Files Guide

This directory should contain images and videos for all service sections.

## Hero Section
- `hero-bg.jpg` (Optional - currently using video background)

## Live Events Section (with Subcategories)

The Live Events section has **4 subcategories**: Musical, Concert, Corporate, and Wedding.

Each subcategory needs **6 images or videos**. The naming convention is:

### Musical Subcategory
- `live-events-musical-1.png` (or `.jpg`, `.mp4`, `.webm`)
- `live-events-musical-2.png`
- `live-events-musical-3.png`
- `live-events-musical-4.png`
- `live-events-musical-5.png`
- `live-events-musical-6.png`

### Concert Subcategory
- `live-events-concert-1.png` (or `.jpg`, `.mp4`, `.webm`)
- `live-events-concert-2.png`
- `live-events-concert-3.png`
- `live-events-concert-4.png`
- `live-events-concert-5.png`
- `live-events-concert-6.png`

### Corporate Subcategory
- `live-events-corporate-1.png` (or `.jpg`, `.mp4`, `.webm`)
- `live-events-corporate-2.png`
- `live-events-corporate-3.png`
- `live-events-corporate-4.png`
- `live-events-corporate-5.png`
- `live-events-corporate-6.png`

### Wedding Subcategory
- `live-events-wedding-1.png` (or `.jpg`, `.mp4`, `.webm`)
- `live-events-wedding-2.png`
- `live-events-wedding-3.png`
- `live-events-wedding-4.png`
- `live-events-wedding-5.png`
- `live-events-wedding-6.png`

**Important Notes for Live Events:**
- Use lowercase subcategory names in filenames (musical, concert, corporate, wedding)
- Supported formats: `.png`, `.jpg`, `.mp4`, `.webm`
- Videos will autoplay and loop automatically
- The component checks for videos first, then falls back to images
- When a user clicks on a subcategory button, it will show the 6 images/videos for that subcategory

## Other Service Sections

Each service section needs **6 images or videos**:

### Architectural Lighting
- `architectural-lighting-1.png` (or `.jpg`, `.mp4`, `.webm`)
- `architectural-lighting-2.png`
- `architectural-lighting-3.png`
- `architectural-lighting-4.png`
- `architectural-lighting-5.png`
- `architectural-lighting-6.png`

### Kinetic Lighting
- `kinetic-lighting-1.png` (or `.jpg`, `.mp4`, `.webm`)
- `kinetic-lighting-2.png`
- `kinetic-lighting-3.png`
- `kinetic-lighting-4.png`
- `kinetic-lighting-5.png`
- `kinetic-lighting-6.png`

### Immersive Interactive Installations
- `immersive-installations-1.png` (or `.jpg`, `.mp4`, `.webm`)
- `immersive-installations-2.png`
- `immersive-installations-3.png`
- `immersive-installations-4.png`
- `immersive-installations-5.png`
- `immersive-installations-6.png`

### Pre Viz Studio
- `pre-viz-studio-1.png` (or `.jpg`, `.mp4`, `.webm`)
- `pre-viz-studio-2.png`
- `pre-viz-studio-3.png`
- `pre-viz-studio-4.png`
- `pre-viz-studio-5.png`
- `pre-viz-studio-6.png`

## Client Logos

Place client logo images in the `/public/images/Clinets/` folder (or rename to `clients`):

- `client-1.png` (or `.jpg`, `.svg`)
- `client-2.png`
- `client-3.png`
- `client-4.png`
- `client-5.png`
- `client-6.png`
- `client-7.png`
- `client-8.png`

**Recommended logo size:** 192px × 96px (2:1 aspect ratio)

## General Notes

- **Image formats supported:** `.png`, `.jpg`
- **Video formats supported:** `.mp4`, `.webm`
- Videos will autoplay and loop automatically in galleries
- The component will try `.png` first, then `.jpg` for images
- The component will try `.mp4` first, then `.webm` for videos
- If an image/video file doesn't exist, a placeholder will be shown
- All files should be placed directly in `/public/images/` folder (except client logos which go in `/public/images/Clinets/` or `/public/images/clients/`)
