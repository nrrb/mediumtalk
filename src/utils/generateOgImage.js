import { Resvg } from '@resvg/resvg-js';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

export async function generateOgImage({ title, colors, width = 1200, height = 630, stripeThickness = 200, saveSvg = false, outputPath = '' }) {
  // Create a very simple SVG without any potential issues
  const safeTitle = String(title || '').replace(/[^\w\s-]/g, '').trim();
  
  // Read the font file directly
  const fontPath = '/assets/Kaph-Regular.woff2';
  // Always embed the font for both SVG and PNG output to ensure consistency
  const fontFile = readFileSync(join(__dirname, '../assets/fonts/Kaph-Regular.woff2'));
  const fontDataUrl = `data:font/woff2;base64,${fontFile.toString('base64')}`;
  
  let svg;
  if (safeTitle === 'Medium Talk') {
    svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>
          @font-face {
            font-family: 'Kaph';
            src: url('${fontDataUrl}') format('woff2');
            font-weight: normal;
            font-style: normal;
            font-display: swap;
          }
        </style>
        <!-- Drop shadow filter -->
        <filter id="text-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
          <feFlood flood-color="rgba(0, 0, 0, 0.5)" result="color" />
          <feComposite in="color" in2="blur" operator="in" result="shadow" />
          <feComposite in="SourceGraphic" in2="shadow" operator="over" />
        </filter>
        <!-- 4 diagonal stripes using instance colors -->
        <!-- Blur filter -->
        <filter id="blur-filter" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
        </filter>
        <!-- Diagonal stripes pattern -->
        <pattern id="diagonal-stripes" width="${stripeThickness * 4}" height="100" patternUnits="userSpaceOnUse" patternTransform="rotate(135)">
          <rect width="${stripeThickness}" height="200" fill="${colors.background}" />
          <rect x="${stripeThickness}" width="${stripeThickness}" height="200" fill="${colors.chipBackground}" />
          <rect x="${stripeThickness * 2}" width="${stripeThickness}" height="200" fill="${colors.text}" />
          <rect x="${stripeThickness * 3}" width="${stripeThickness}" height="200" fill="${colors.chipText}" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#diagonal-stripes)" />
      <!-- Blur layer -->
      <rect width="100%" height="100%" fill="rgba(255, 255, 255, 0.7)" filter="url(#blur-filter)" />
      <text 
        x="10%" 
        y="50%" 
        font-family="Kaph, Arial, sans-serif"
        font-size="132"
        fill="black"
        text-anchor="left"
        font-weight="normal" filter="url(#text-shadow)"
      >Medium</text>
      <text 
        x="10%" 
        y="70%" 
        font-family="Kaph, Arial, sans-serif"
        font-size="132"
        fill="black"
        text-anchor="left"
        font-weight="normal" filter="url(#text-shadow)"
      >Talk</text>
      <text 
        x="10%" 
        y="90%" 
        font-family="Kaph, Arial, sans-serif"
        font-size="30"
        fill="black"
        text-anchor="left"
        font-weight="normal" filter="url(#text-shadow)"
      >Get to know someone.</text>
    </svg>
    `;
  } else {
    svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>
          @font-face {
            font-family: 'Kaph';
            src: url('${fontDataUrl}') format('woff2');
            font-weight: normal;
            font-style: normal;
            font-display: swap;
          }
        </style>
        <!-- Drop shadow filter -->
        <filter id="text-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
          <feFlood flood-color="rgba(0, 0, 0, 0.5)" result="color" />
          <feComposite in="color" in2="blur" operator="in" result="shadow" />
          <feComposite in="SourceGraphic" in2="shadow" operator="over" />
        </filter>
        <!-- 4 diagonal stripes using instance colors -->
        <!-- Blur filter -->
        <filter id="blur-filter" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
        </filter>
        <!-- Diagonal stripes pattern -->
        <pattern id="diagonal-stripes" width="${stripeThickness * 4}" height="100" patternUnits="userSpaceOnUse" patternTransform="rotate(135)">
          <rect width="${stripeThickness}" height="200" fill="${colors.background}" />
          <rect x="${stripeThickness}" width="${stripeThickness}" height="200" fill="${colors.chipBackground}" />
          <rect x="${stripeThickness * 2}" width="${stripeThickness}" height="200" fill="${colors.text}" />
          <rect x="${stripeThickness * 3}" width="${stripeThickness}" height="200" fill="${colors.chipText}" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#diagonal-stripes)" />
      <!-- Blur layer -->
      <rect width="100%" height="100%" fill="rgba(255, 255, 255, 0.7)" filter="url(#blur-filter)" />
      <text 
        x="10%" 
        y="50%" 
        font-family="Kaph, Arial, sans-serif"
        font-size="80"
        fill="black"
        text-anchor="left"
        font-weight="normal" filter="url(#text-shadow)"
      >Medium</text>
      <text 
        x="10%" 
        y="62%" 
        font-family="Kaph, Arial, sans-serif"
        font-size="80"
        fill="black"
        text-anchor="left"
        font-weight="normal" filter="url(#text-shadow)"
      >Talk:</text>
      <text 
        x="10%" 
        y="80%" 
        font-family="Kaph, Arial, sans-serif"
        font-size="100"
        fill="black"
        text-anchor="left"
        font-weight="bold"
      >${safeTitle}</text>
      <text 
        x="10%" 
        y="90%" 
        font-family="Kaph, Arial, sans-serif"
        font-size="30"
        fill="black"
        text-anchor="left"
        font-weight="normal" filter="url(#text-shadow)"
      >Get to know someone.</text>
    </svg>
    `;
  }

  try {
    // First, write the SVG to a temporary file
    const fs = await import('fs/promises');
    const path = await import('path');
    const tempSvgPath = join(__dirname, 'temp-og-image.svg');
    await fs.writeFile(tempSvgPath, svg);
    
    const svgBuffer = await fs.readFile(tempSvgPath);

    const fontPath = path.resolve(__dirname, '../assets/fonts/Kaph-Regular.ttf');
    console.log(`[generateOgImage] Font path: ${fontPath}`);
    const opts = {
      background: 'rgba(0, 0, 0, 0)',
      fitTo: {
        mode: 'width',
        value: width,
      },
      font: {
        fontFiles: [fontPath],
        loadSystemFonts: false,
        defaultFontFamily: 'Kaph',
      },
    }

    const resvg = new Resvg(svgBuffer, opts);
    const pngData = resvg.render();
    const pngBuffer = pngData.asPng();
    
    // Clean up the temporary SVG file
    await fs.unlink(tempSvgPath).catch(() => {});
    
    // Save SVG if requested
    if (saveSvg && outputPath) {
      const svgPath = outputPath.replace(/\.png$/, '.svg');
      const fs = await import('fs/promises');
      await fs.mkdir(dirname(svgPath), { recursive: true });
      await fs.writeFile(svgPath, svg);
      console.log(`Saved SVG to: ${svgPath}`);
    }
    
    return pngBuffer;
  } catch (error) {
    console.error('Error generating OG image:', error);
    throw error;
  }
}
