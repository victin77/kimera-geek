// Recorta as bordas transparentes do hero-figure para o personagem preencher o quadro.
import sharp from 'sharp'

const src = 'public/hero-figure-original.png'
const out = 'public/hero-figure.png'

const before = await sharp(src).metadata()
const buf = await sharp(src)
  .trim({ threshold: 10 }) // remove margens transparentes/uniformes
  .toBuffer()
const after = await sharp(buf).metadata()

await sharp(buf).toFile(out)

console.log(`Antes:  ${before.width} x ${before.height}`)
console.log(`Depois: ${after.width} x ${after.height}`)
