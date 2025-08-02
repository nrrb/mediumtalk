import { Resvg } from '@resvg/resvg-js';

export async function generateOgImage({ title, colors, width = 1200, height = 630 }) {
  // Create a very simple SVG without any potential issues
  const safeTitle = String(title || '').replace(/[^\w\s-]/g, '').trim();
  
  // Simple SVG with inline styles
  const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${colors.background || '#4a6fa5'}" />
          <stop offset="100%" stop-color="${colors.chipBackground || '#8fa8c7'}" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg)" />
      <text 
        x="10%" 
        y="50%" 
        font-family="Arial, sans-serif"
        font-size="80"
        fill="white"
        text-anchor="left"
      >Medium</text>
      <text 
        x="10%" 
        y="60%" 
        font-family="Arial, sans-serif"
        font-size="80"
        fill="white"
        text-anchor="left"
      >Talk:</text>
      <text 
        x="10%" 
        y="80%" 
        font-family="Arial, sans-serif"
        font-weight="bold"
        font-size="100"
        fill="white"
        text-anchor="left"
      >${safeTitle}</text>
    </svg>
  `;

  try {
    const resvg = new Resvg(svg, {
      fitTo: {
        mode: 'width',
        value: width,
      },
      font: {
        loadSystemFonts: true,
      },
    });

    const pngData = resvg.render();
    return pngData.asPng();
  } catch (error) {
    console.error('Error generating OG image:', error);
    throw error;
  }
}
