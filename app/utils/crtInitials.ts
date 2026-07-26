// Samples text (the initials "T.A") into a 3D point cloud by rasterising it to a
// canvas and placing a point at every filled pixel. `layers` > 1 extrudes the
// letters across `depth` so they read as a solid 3D slab when spun.
export interface InitialsOptions {
  world?: number
  step?: number
  depth?: number
  layers?: number
}

export function sampleInitials(text = 'T.A', options: InitialsOptions = {}): Float32Array {
  if (!import.meta.client) return new Float32Array(0)

  const world = options.world ?? 20
  const step = options.step ?? 3
  const depth = options.depth ?? 1.2
  const layers = options.layers ?? 1

  const W = 360
  const H = 180
  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')
  if (!ctx) return new Float32Array(0)

  ctx.fillStyle = '#fff'
  ctx.font = `bold ${Math.floor(H * 0.72)}px monospace`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(text, W / 2, H / 2 + 4)

  const data = ctx.getImageData(0, 0, W, H).data
  const out: number[] = []

  for (let y = 0; y < H; y += step) {
    for (let x = 0; x < W; x += step) {
      if (data[(y * W + x) * 4 + 3] <= 128) continue
      const sx = (x / W - 0.5) * world
      const sy = (0.5 - y / H) * world * (H / W)
      if (layers > 1) {
        for (let l = 0; l < layers; l++) {
          out.push(sx, sy, (l / (layers - 1) - 0.5) * depth)
        }
      }
      else {
        out.push(sx, sy, (Math.random() - 0.5) * depth)
      }
    }
  }

  return new Float32Array(out)
}
