// Verifica transparência e recorta bordas das figuras do hero.
import sharp from 'sharp'
import { existsSync, copyFileSync } from 'node:fs'

const files = ['hero-figure-2.png', 'hero-figure-3.png']

for (const name of files) {
  const src = `public/${name}`
  const backup = `public/${name.replace('.png', '-original.png')}`

  // backup do original (uma vez só)
  if (!existsSync(backup)) copyFileSync(src, backup)

  const meta = await sharp(backup).metadata()

  // checa se há pixels realmente transparentes
  const stats = await sharp(backup).stats()
  const hasRealAlpha = meta.hasAlpha && stats.channels.length === 4
    ? (await sharp(backup).extractChannel('alpha').stats()).channels[0].min < 250
    : false

  const trimmed = await sharp(backup).trim({ threshold: 10 }).toBuffer()
  const after = await sharp(trimmed).metadata()
  await sharp(trimmed).toFile(src)

  console.log(
    `${name}: ${meta.width}x${meta.height} -> ${after.width}x${after.height} | alpha=${meta.hasAlpha} | transparenciaReal=${hasRealAlpha}`,
  )
}
