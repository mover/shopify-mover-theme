const fs = require('fs');
const path = require('path');

// Read the sprites.view.svg file
const spritesPath = path.join(__dirname, 'sprites.view.svg');
const outputDir = path.join(__dirname, 'output_svgs');

// Check if sprites.view.svg exists
if (!fs.existsSync(spritesPath)) {
  console.error('Error: sprites.view.svg file not found');
  process.exit(1);
}

// Read the file content
const spritesContent = fs.readFileSync(spritesPath, 'utf8');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
  console.log('Created output_svgs directory');
}

// Regular expression to match symbol elements with their id and content
const symbolRegex = /<symbol\s+([^>]*id=["']([^"']+)["'][^>]*)>([\s\S]*?)<\/symbol>/g;

let match;
let count = 0;

// Extract each symbol and create individual SVG files
while ((match = symbolRegex.exec(spritesContent)) !== null) {
  const attributes = match[1]; // All attributes including id
  const id = match[2]; // The id value
  const content = match[3]; // Inner content of the symbol
  
  // Parse attributes from the symbol element
  const viewBoxMatch = attributes.match(/viewBox=["']([^"']+)["']/);
  const fillMatch = attributes.match(/fill=["']([^"']+)["']/);
  const strokeWidthMatch = attributes.match(/stroke-width=["']([^"']+)["']/);
  const strokeMatch = attributes.match(/stroke=["']([^"']+)["']/);
  
  // Build the SVG element with the extracted attributes
  let svgAttributes = 'xmlns="http://www.w3.org/2000/svg"';
  
  if (viewBoxMatch) {
    svgAttributes += ` viewBox="${viewBoxMatch[1]}"`;
  }
  if (fillMatch) {
    svgAttributes += ` fill="${fillMatch[1]}"`;
  }
  if (strokeWidthMatch) {
    svgAttributes += ` stroke-width="${strokeWidthMatch[1]}"`;
  }
  if (strokeMatch) {
    svgAttributes += ` stroke="${strokeMatch[1]}"`;
  }
  
  // Create the individual SVG file content
  const svgContent = `<svg ${svgAttributes}>\n${content}\n</svg>\n`;
  
  // Write the SVG file
  const outputPath = path.join(outputDir, `${id}.svg`);
  fs.writeFileSync(outputPath, svgContent, 'utf8');
  
  console.log(`Extracted: ${id}.svg`);
  count++;
}

console.log(`\nSuccessfully extracted ${count} SVG files to ${outputDir}`);
