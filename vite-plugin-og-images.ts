import { Plugin } from 'vite';
import { readFile, writeFile, mkdir } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { generateOgImage } from './src/utils/generateOgImage';
import instances from './src/instances.json';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE_URL = 'https://mediumtalk.org';

export function generateOgImages(): Plugin {
  return {
    name: 'vite-plugin-og-images',
    async buildStart() {
      const outputDir = join(__dirname, 'dist/og-images');
      
      // Create output directory if it doesn't exist
      await mkdir(outputDir, { recursive: true });

      // Read the HTML template
      const htmlPath = join(__dirname, 'index.html');
      let html = await readFile(htmlPath, 'utf-8');

      // Generate images and HTML for each instance
      for (const instance of instances) {
        const imageName = `${instance.name.toLowerCase().replace(/\s+/g, '-')}.png`;
        const imagePath = `/og-images/${imageName}`;
        
        // Generate the OG image
        const pngBuffer = await generateOgImage({
          title: instance.name,
          colors: instance.colorScheme,
        });

        // Save the image
        const outputPath = join(outputDir, imageName);
        await writeFile(outputPath, pngBuffer);
        console.log(`Generated OpenGraph image: ${outputPath}`);

        // Generate instance-specific HTML
        const instanceHtml = html
          .replace('OG_TITLE', `Medium Talk: ${instance.name}`)
          .replace('OG_DESCRIPTION', `Conversation starters for ${instance.name}`)
          .replace(/OG_IMAGE/g, `${SITE_URL}${imagePath}`)
          .replace('OG_URL', `${SITE_URL}${instance.path}`);

        // Write instance-specific HTML
        const instanceHtmlPath = join(__dirname, 'dist', instance.path.replace(/^\//, ''), 'index.html');
        await mkdir(dirname(instanceHtmlPath), { recursive: true });
        await writeFile(instanceHtmlPath, instanceHtml);
        console.log(`Generated HTML for ${instance.name} at ${instanceHtmlPath}`);
      }

      // Also generate the default homepage HTML
      const defaultHtml = html
        .replace('OG_TITLE', 'Medium Talk - Conversation Starter Questions')
        .replace('OG_DESCRIPTION', 'A nice little app to give you questions to start conversations, bypassing small talk.')
        .replace(/OG_IMAGE/g, `${SITE_URL}/og-images/default.png`)
        .replace('OG_URL', SITE_URL);

      // Generate a default OG image
      const defaultPngBuffer = await generateOgImage({
        title: 'Medium Talk',
        colors: {
          background: '#4a6fa5',
          text: '#6b8cae',
          chipBackground: '#8fa8c7',
          chipText: '#b3c5d7'
        },
      });
      await writeFile(join(outputDir, 'default.png'), defaultPngBuffer);
      
      // Write the default HTML
      await writeFile(join(__dirname, 'dist/index.html'), defaultHtml);
    },
  };
}
