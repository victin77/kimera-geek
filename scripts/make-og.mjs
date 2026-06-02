// Gera a imagem de Open Graph (1200x630): fundo laranja + logo centralizada.
import sharp from 'sharp'

const W = 1200
const H = 630

const logo = await sharp('public/favicon.png').resize({ width: 620 }).toBuffer()

await sharp({
  create: { width: W, height: H, channels: 4, background: '#F97316' },
})
  .composite([{ input: logo, gravity: 'center' }])
  .png()
  .toFile('public/og-image.png')

console.log('og-image.png gerado (1200x630)')
