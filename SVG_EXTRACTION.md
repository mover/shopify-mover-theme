# SVG Sprite Extraction

This repository includes functionality to extract individual SVG files from an SVG sprite sheet.

## Overview

The `sprites.view.svg` file contains multiple SVG icons combined into a single sprite sheet using `<symbol>` elements. Each symbol has a unique `id` attribute that identifies it.

## Usage

To extract individual SVG files from the sprite sheet, run:

```bash
npm run extract-svgs
```

Or directly:

```bash
node extract-svgs.js
```

## What it does

The extraction script:
1. Reads the `sprites.view.svg` file
2. Creates an `output_svgs` directory (if it doesn't exist)
3. Parses each `<symbol>` element from the sprite sheet
4. Extracts the symbol's `id` and content
5. Creates individual SVG files named `{id}.svg` in the `output_svgs` directory
6. Preserves all SVG attributes (viewBox, fill, stroke, etc.)

## Example

If `sprites.view.svg` contains:

```xml
<svg xmlns="http://www.w3.org/2000/svg">
  <symbol id="icon-menu" viewBox="0 0 24 24">
    <path d="..." />
  </symbol>
  <symbol id="icon-close" viewBox="0 0 24 24">
    <path d="..." />
  </symbol>
</svg>
```

Running the extraction will create:
- `output_svgs/icon-menu.svg`
- `output_svgs/icon-close.svg`

Each file will be a standalone SVG with proper structure and attributes.

## Output

The extracted SVG files are created in the `output_svgs` directory, which is excluded from version control via `.gitignore`.
