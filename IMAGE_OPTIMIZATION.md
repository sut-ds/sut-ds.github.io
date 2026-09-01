# Image Optimization Guide

## Current State

Your site uses static export for GitHub Pages deployment. This requires `unoptimized: true` in `next.config.ts`, which means Next.js Image Optimization is disabled. However, we've implemented several best practices:

### ✅ Current Optimizations

1. **Structured Dimensions**: All images have explicit `width` and `height` attributes
   - University mark: 64×64px
   - Staff photos: 96×96px
   - Assignment logos: 48×48px
   - This prevents Cumulative Layout Shift (CLS)

2. **Lazy Loading**: Images use `loading="lazy"` and `decoding="async"`
   - Staff photos load only when in viewport
   - Assignment logos load only when in viewport
   - Critical hero image (University mark) loads eagerly

3. **Proper Alt Text**: All images have descriptive alt attributes
   - Supports accessibility and SEO

4. **Async Decoding**: Images decode asynchronously to prevent blocking rendering

## Future Enhancements (When Migrating from Static Export)

### Option 1: Switch to Dynamic Rendering (Recommended for Production)

If you migrate away from static GitHub Pages export, you can:

```bash
# In next.config.ts, remove/change:
const nextConfig: NextConfig = {
  // Remove: output: "export",
  output: undefined, // or remove entirely for dynamic rendering
  trailingSlash: true,
  images: {
    // Remove: unoptimized: true,
    // Enable Next.js Image Optimization
    formats: ["image/webp", "image/avif"],
  },
};
```

Then use Next.js `Image` component:

```tsx
import Image from "next/image";

<Image
  src="/images/staff/example.jpg"
  alt="Staff member"
  width={96}
  height={96}
  loading="lazy"
  priority={false}
/>
```

**Benefits:**
- Automatic WebP/AVIF conversion
- Responsive image sizes
- Built-in optimization
- Smaller file sizes

### Option 2: Manual WebP Format Support (Current Setup)

Keep static export but add WebP variants:

```bash
# In public/images/staff/
example.jpg      # Original (96×96px)
example.webp     # WebP variant (20-30% smaller)
```

Use in HTML:

```tsx
<picture>
  <source srcSet="/images/staff/example.webp" type="image/webp" />
  <source srcSet="/images/staff/example.jpg" type="image/jpeg" />
  <img
    src="/images/staff/example.jpg"
    alt="Staff member"
    width={96}
    height={96}
    loading="lazy"
  />
</picture>
```

### Option 3: Third-party Optimization Service

Services like Cloudinary, Imgix, or Imagekit provide:
- Automatic format selection
- Responsive sizing
- Global CDN delivery
- Minimal code changes

Example:

```tsx
<img
  src="https://res.cloudinary.com/your-account/image/fetch/w_96,h_96,f_auto,q_auto/https://sut-ds.github.io/images/staff/example.jpg"
  alt="Staff member"
  width={96}
  height={96}
  loading="lazy"
/>
```

## Image Asset Checklist

- [ ] All images have width/height attributes
- [ ] All images have descriptive alt text
- [ ] Images use `loading="lazy"` (except hero images)
- [ ] Images use `decoding="async"`
- [ ] OG image (og.png) is 1200×630px
- [ ] Favicon is in SVG format (smallest possible)

## Performance Metrics to Monitor

1. **Cumulative Layout Shift (CLS)** - Target: < 0.1
   - Width/height attributes prevent layout shifts
   - Currently optimized ✓

2. **Largest Contentful Paint (LCP)** - Target: < 2.5s
   - Lazy loading helps by deferring non-critical images
   - Currently optimized ✓

3. **First Input Delay (FID)** - Target: < 100ms
   - Async decoding reduces main thread blocking
   - Currently optimized ✓

## Recommended Next Steps

1. **Immediate**: Monitor Core Web Vitals using Google Search Console
2. **Short-term**: Add WebP variants for frequently-served images
3. **Long-term**: Consider migrating to dynamic hosting (Vercel, Netlify) for automatic optimization
