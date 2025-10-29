import sharp from 'sharp';
import { readdir } from 'fs/promises';
import { join } from 'path';

const inputDir = 'attached_assets';
const outputDir = 'attached_assets_optimized';

async function optimizeImages() {
  const files = await readdir(inputDir);
  const jpegFiles = files.filter(f => f.toLowerCase().endsWith('.jpeg') || f.toLowerCase().endsWith('.jpg'));
  
  console.log(`Found ${jpegFiles.length} JPEG files to optimize`);
  
  for (const file of jpegFiles) {
    const inputPath = join(inputDir, file);
    const outputPath = join(outputDir, file.replace(/\.jpe?g$/i, '.webp'));
    
    await sharp(inputPath)
      .webp({ quality: 75, effort: 6 })
      .resize(1920, 1920, { fit: 'inside', withoutEnlargement: true })
      .toFile(outputPath);
    
    console.log(`Optimized: ${file} -> ${outputPath.split('/').pop()}`);
  }
  
  console.log('\nOptimization complete!');
}

optimizeImages().catch(console.error);
