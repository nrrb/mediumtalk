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

      // Generate images for each instance
      for (const instance of instances) {
        const imageName = `${instance.name.toLowerCase().replace(/\s+/g, '-')}.png`;
        
        // Generate and save the OG image and SVG
        const outputPath = join(fullOutputDir, imageName);
        console.log(`Generating OpenGraph image: ${outputPath}`);
        try {
          const pngBuffer = await generateOgImage({
            title: instance.name,
            colors: instance.colorScheme,
            saveSvg: true,
            outputPath: outputPath
          });
          
          // Save the PNG
          await writeFile(outputPath, pngBuffer);
          console.log(`Successfully wrote OpenGraph image: ${outputPath}`);
        } catch (error) {
          console.error(`Error generating OpenGraph image:`, error);
          throw error;
        }
      }

      // Generate and save default OG image and SVG
      const defaultOutputPath = join(fullOutputDir, 'default.png');
      console.log(`Generating default OpenGraph image: ${defaultOutputPath}`);
      try {
        const defaultPngBuffer = await generateOgImage({
          title: 'Medium Talk',
          colors: {
            background: '#4a6fa5',
            text: '#6b8cae',
            chipBackground: '#8fa8c7',
            chipText: '#b3c5d7'
          },
          saveSvg: true,
          outputPath: defaultOutputPath
        });
        await writeFile(defaultOutputPath, defaultPngBuffer);
        console.log(`Successfully wrote default OpenGraph image: ${defaultOutputPath}`);
      } catch (error) {
        console.error('Error generating default OpenGraph image:', error);
        throw error;
      }
    },
  };
}
