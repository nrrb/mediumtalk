import { Resvg } from '@resvg/resvg-js';

interface GenerateOgImageParams {
  title: string;
  colors: {
    background: string;
    text: string;
    chipBackground: string;
    chipText: string;
  };
  width?: number;
  height?: number;
}

export async function generateOgImage({
  title,
  colors,
  width = 1200,
  height = 1200,
}: GenerateOgImageParams): Promise<Buffer> {
  const gradient = `linear-gradient(45deg, ${colors.background}, ${colors.text}, ${colors.chipBackground}, ${colors.chipText})`;
  
  const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@700&display=swap');
          .gradient-bg {
            fill: url(#gradient);
          }
          .text {
            font-family: 'Inter', sans-serif;
            font-weight: 700;
            fill: white;
            font-size: 100px;
            text-anchor: middle;
            dominant-baseline: middle;
          }
        </style>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${colors.background}" />
          <stop offset="33%" stop-color="${colors.text}" />
          <stop offset="66%" stop-color="${colors.chipBackground}" />
          <stop offset="100%" stop-color="${colors.chipText}" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" class="gradient-bg" />
      <text x="50%" y="40%" class="text">Medium</text>
      <text x="50%" y="50%" class="text">Talk:</text>
      <text x="50%" y="65%" class="text">${title}</text>
    </svg>
  `;

  const resvg = new Resvg(svg, {
    fitTo: {
      mode: 'width',
      value: width,
    },
    font: {
      loadSystemFonts: false,
      fontDirs: [],
    },
  });

  const pngData = resvg.render();
  return pngData.asPng();
}
