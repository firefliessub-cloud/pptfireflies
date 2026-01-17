# Fireflies Creative Technologies - Portfolio Website

A premium, modern one-page portfolio website for a creative lighting design studio built with Next.js, Tailwind CSS, and Framer Motion.

## Features

- 🎨 **Dark Luxury Theme** - Premium dark design with accent glow effects
- ✨ **Smooth Animations** - Framer Motion scroll-triggered animations throughout
- 📱 **Fully Responsive** - Beautiful on all devices with mobile menu
- 🔗 **Smooth Navigation** - Sticky navigation with smooth anchor link scrolling
- 🎭 **Interactive Elements** - Hover effects, glow animations, and animated buttons

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **Lucide React** (Icons)

## Getting Started

### Installation

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Build

Build for production:

```bash
npm run build
```

Start production server:

```bash
npm start
```

## Website Structure

1. **Hero Section** - Fullscreen with gradient overlay, large heading, tagline, and CTA button
2. **About Section** - Company information with fade-in animation
3. **What We Do Section** - Four service cards with hover glow effects and smooth scroll to service sections
4. **Service Sections** - Four dedicated sections (Event, Architectural, Kinetic, Immersive) each with 6-image gallery grid
5. **Contact Section** - Contact form, information, and social media links

## Adding Images

Place your project images in the `/public/images` directory. See `/public/images/README.md` for the required image naming convention. The website will function with gradient placeholders if images are not present.

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   ├── Navigation.tsx      # Sticky navigation
│   ├── Hero.tsx           # Hero section
│   ├── About.tsx          # About section
│   ├── WhatWeDo.tsx       # Services overview
│   ├── ServiceSection.tsx # Individual service sections
│   └── Contact.tsx        # Contact section
└── public/
    └── images/            # Image assets
```

## Customization

- **Colors**: Edit `tailwind.config.ts` to modify the accent colors
- **Content**: Update text content in each component file
- **Styling**: Modify Tailwind classes directly in components
- **Animations**: Adjust Framer Motion animations in component files

## License

This project is created for Fireflies Creative Technologies.
