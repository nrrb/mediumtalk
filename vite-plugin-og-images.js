import { readFile, writeFile, mkdir } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { generateOgImage } from './src/utils/generateOgImage.js';
import instances from './src/instances.json';

const __dirname = dirname(fileURLToPath(import.meta.url));

export function generateOgImages(options = {}) {
  const {
    outputDir = 'docs/og-images',
    basePath = '/',
    siteUrl = 'https://mediumtalk.org'
  } = options;

  return {
    name: 'vite-plugin-og-images',
    async buildStart() {
      const fullOutputDir = join(__dirname, outputDir);
      
      // Create output directory if it doesn't exist
      console.log(`Creating output directory: ${fullOutputDir}`);
      try {
        await mkdir(fullOutputDir, { recursive: true });
        console.log(`Directory created successfully`);
      } catch (error) {
        console.error(`Error creating directory:`, error);
        throw error;
      }

      // Read the HTML template
      const htmlPath = join(__dirname, 'index.html');
      console.log(`Reading HTML template from: ${htmlPath}`);
      let html;
      try {
        html = await readFile(htmlPath, 'utf-8');
      } catch (error) {
        console.error(`Error reading HTML template:`, error);
        throw error;
      }

      // Generate images and HTML for each instance
      for (const instance of instances) {
        const imageName = `${instance.name.toLowerCase().replace(/\s+/g, '-')}.png`;
        const imagePath = `${basePath}og-images/${imageName}`;
        
        // Generate the OG image
        const pngBuffer = await generateOgImage({
          title: instance.name,
          colors: instance.colorScheme,
        });

        // Save the image
        const outputPath = join(fullOutputDir, imageName);
        console.log(`Writing OpenGraph image to: ${outputPath}`);
        try {
          await writeFile(outputPath, pngBuffer);
          console.log(`Successfully wrote OpenGraph image: ${outputPath}`);
        } catch (error) {
          console.error(`Error writing OpenGraph image:`, error);
          throw error;
        }

        // Generate instance-specific HTML
        const instanceHtml = html
          .replace('OG_TITLE', `Medium Talk: ${instance.name}`)
          .replace('OG_DESCRIPTION', `Conversation starters for ${instance.name}`)
          .replace(/OG_IMAGE/g, `${siteUrl}${imagePath}`)
          .replace('OG_URL', `${siteUrl}${instance.path}`);

        // Write instance-specific HTML
        const instanceHtmlPath = join(__dirname, outputDir.replace(/\/og-images$/, ''), instance.path.replace(/^\//, ''), 'index.html');
        await mkdir(dirname(instanceHtmlPath), { recursive: true });
        await writeFile(instanceHtmlPath, instanceHtml);
        console.log(`Generated HTML for ${instance.name} at ${instanceHtmlPath}`);
      }

      // Also generate the default homepage HTML
      const defaultHtml = html
        .replace('OG_TITLE', 'Medium Talk - Conversation Starter Questions')
        .replace('OG_DESCRIPTION', 'A nice little app to give you questions to start conversations, bypassing small talk.')
        .replace(/OG_IMAGE/g, `${siteUrl}${basePath}og-images/default.png`)
        .replace('OG_URL', siteUrl);

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
      await writeFile(join(fullOutputDir, 'default.png'), defaultPngBuffer);
      
      // Write the default HTML
      await writeFile(join(__dirname, outputDir.replace(/\/og-images$/, ''), 'index.html'), defaultHtml);
    },
  };
}
