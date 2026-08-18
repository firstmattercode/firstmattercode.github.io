// Generates the brand images that Next.js picks up by file convention:
//
//   - src/app/icon.png             512x512   favicon / touch icon
//   - src/app/opengraph-image.png  1200x630  Open Graph (Facebook, etc.)
//   - src/app/twitter-image.png    1200x630  Twitter/X (identical art)
//
// Everything is flat color plus Instrument Serif type — the same display
// face the page uses. The TTF is pulled from Google's font repo into
// .cache/ on first run (gitignored) and drawn as outlines, so the art
// doesn't depend on which fonts happen to be installed on the machine
// running the script.
//
// Run with: npm run gen:brand  (then commit the three PNGs)

import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import opentype from 'opentype.js'
import sharp from 'sharp'

// The Mist scale from globals.css, converted from oklch to sRGB hex —
// sharp rasterizes 8-bit sRGB, not oklch.
const MIST_50 = '#f9fbfb'
const MIST_100 = '#f1f3f3'
const MIST_700 = '#394447'
const MIST_950 = '#090b0c'

const FONT_URL =
  'https://raw.githubusercontent.com/google/fonts/main/ofl/instrumentserif/InstrumentSerif-Regular.ttf'
const FONT_FILE = join('.cache', 'InstrumentSerif-Regular.ttf')

// Downloaded once and cached; the file never changes upstream in practice.
async function instrumentSerif() {
  let ttf: Buffer
  try {
    ttf = await readFile(FONT_FILE)
  } catch {
    const response = await fetch(FONT_URL)
    if (!response.ok) {
      throw new Error(`gen-brand: font download failed (${response.status})`)
    }
    ttf = Buffer.from(await response.arrayBuffer())
    await mkdir('.cache', { recursive: true })
    await writeFile(FONT_FILE, ttf)
    console.log(`gen-brand: cached ${FONT_FILE}`)
  }
  return opentype.parse(
    ttf.buffer.slice(ttf.byteOffset, ttf.byteOffset + ttf.byteLength),
  )
}

const font = await instrumentSerif()

// Laid out glyph by glyph rather than through font.getPath(), which runs
// opentype.js's shaper and throws on Instrument Serif's ccmp table. Latin
// text needs no shaping — advances plus kerning are the whole job.
function layout(text: string, size: number) {
  const scale = size / font.unitsPerEm
  const glyphs = [...text].map((char) => font.charToGlyph(char))

  let pen = 0
  const placed = glyphs.map((glyph, i) => {
    const at = pen
    pen += (glyph.advanceWidth ?? 0) * scale
    const next = glyphs[i + 1]
    if (next) pen += font.getKerningValue(glyph, next) * scale
    return { glyph, at }
  })

  return { placed, width: pen }
}

const width = (text: string, size: number) => layout(text, size).width

// Distance from baseline to the top of a capital, in px at `size`.
const capHeight = (size: number) =>
  ((font.tables.os2?.sCapHeight ?? font.ascender) / font.unitsPerEm) * size

// One line of type, as sharp composite operations — one small raster per
// glyph. Rasterizing the whole line as a single SVG corrupts scattered
// glyphs in librsvg, and a glyph on its own always comes out clean.
// Positions land on whole pixels, which at these sizes is invisible.
async function line(
  text: string,
  size: number,
  color: string,
  x: number,
  baseline: number,
) {
  const composites = []

  for (const { glyph, at } of layout(text, size).placed) {
    const path = glyph.getPath(0, 0, size)
    const d = path.toSVG(2).match(/ d="([^"]*)"/)?.[1] ?? ''
    if (!d.trim()) continue // space and friends

    // A 1px margin keeps antialiased edges off the tile boundary.
    const box = path.getBoundingBox()
    const tileWidth = Math.ceil(box.x2 - box.x1) + 2
    const tileHeight = Math.ceil(box.y2 - box.y1) + 2

    composites.push({
      input: await sharp(
        Buffer.from(
          `<svg xmlns="http://www.w3.org/2000/svg" width="${tileWidth}" height="${tileHeight}">` +
            `<path fill="${color}" transform="translate(${1 - box.x1} ${1 - box.y1})" d="${d}"/>` +
            `</svg>`,
        ),
      )
        .png()
        .toBuffer(),
      left: Math.round(x + at + box.x1) - 1,
      top: Math.round(baseline + box.y1) - 1,
    })
  }

  return composites
}

async function write(
  image: sharp.Sharp,
  files: string[],
  size: [number, number],
) {
  const png = await image.png().toBuffer()
  for (const file of files) {
    await sharp(png).toFile(file)
    console.log(`gen-brand: ${file} (${size[0]}x${size[1]})`)
  }
}

// Favicon: a single serif capital on the dark end of the scale, optically
// centered on its cap height. Placeholder wordmark — swap in real art here
// when the LLC has one.
const ICON = 512
const ICON_SIZE = 360

await write(
  sharp({
    create: { width: ICON, height: ICON, channels: 4, background: MIST_950 },
  }).composite(
    await line(
      'F',
      ICON_SIZE,
      MIST_50,
      (ICON - width('F', ICON_SIZE)) / 2,
      (ICON + capHeight(ICON_SIZE)) / 2,
    ),
  ),
  [join('src', 'app', 'icon.png')],
  [ICON, ICON],
)

// Social card: the same lockup as the page — title over description,
// left-aligned on the light background.
const CARD_W = 1200
const CARD_H = 630
const MARGIN = 96
const TITLE_BASELINE = 330

await write(
  sharp({
    create: {
      width: CARD_W,
      height: CARD_H,
      channels: 4,
      background: MIST_100,
    },
  }).composite([
    ...(await line('First Matter Code', 116, MIST_950, MARGIN, TITLE_BASELINE)),
    ...(await line(
      'An independent software studio.',
      40,
      MIST_700,
      MARGIN,
      TITLE_BASELINE + 72,
    )),
  ]),
  [
    join('src', 'app', 'opengraph-image.png'),
    join('src', 'app', 'twitter-image.png'),
  ],
  [CARD_W, CARD_H],
)
