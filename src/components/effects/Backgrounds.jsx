import { useEffect, useRef } from 'react'

// Fundo cosmico global: aurora (CSS) + waveform (login) + estrelas + vinheta.
// Port fiel dos IIFEs canvas do HTML.
export default function Backgrounds({ showViz, showStars = true }) {
  const vizRef = useRef(null)
  const starRef = useRef(null)
  const vizApi = useRef(null)
  const starApi = useRef(null)

  // ===== VISUALIZADOR DE MUSICA (waveform de barras espelhadas) =====
  useEffect(() => {
    const c = vizRef.current
    if (!c) return
    const ctx = c.getContext('2d')
    if (!ctx) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w, h, dpr, cx, cy, bars, gap, bw, raf = 0, t0 = 0
    const STOPS = [[34, 211, 238], [129, 140, 248], [168, 85, 247], [236, 72, 153]]
    const mix = (a, b, k) => [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k]
    function colorAt(f) { const seg = f * (STOPS.length - 1); const i = Math.min(STOPS.length - 2, Math.floor(seg)); return mix(STOPS[i], STOPS[i + 1], seg - i) }
    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = c.width = Math.floor(innerWidth * dpr); h = c.height = Math.floor(innerHeight * dpr)
      c.style.width = innerWidth + 'px'; c.style.height = innerHeight + 'px'
      cx = w / 2; cy = h * 0.60
      const target = Math.round(innerWidth / 15)
      bars = Math.max(26, Math.min(120, target)); gap = w / bars; bw = Math.max(2 * dpr, gap * 0.40)
    }
    function amp(i, time) {
      const f = (bars > 1) ? i / (bars - 1) : 0.5
      const x = f * Math.PI
      let s = Math.sin(x * 3.0 + time * 1.7) * 0.55 + Math.sin(x * 7.0 - time * 1.1) * 0.30 + Math.sin(x * 13.0 + time * 2.3) * 0.18 + Math.sin(x * 1.5 - time * 0.6) * 0.35
      s = Math.min(1, Math.abs(s) * 0.85)
      const env = 0.32 + 0.68 * Math.pow(Math.sin(f * Math.PI), 0.8)
      const beat = 0.80 + 0.20 * Math.sin(time * 2.4)
      return s * env * beat
    }
    const smooth = []
    function draw(time) {
      ctx.clearRect(0, 0, w, h); ctx.globalAlpha = 0.9
      const maxH = h * (reduce ? 0.15 : 0.19); const radius = bw * 0.5
      for (let i = 0; i < bars; i++) {
        const target = amp(i, time)
        smooth[i] = (smooth[i] == null) ? target : smooth[i] + (target - smooth[i]) * 0.35
        const bh = smooth[i] * maxH + 2 * dpr
        const x = (i + 0.5) * gap
        const col = colorAt((bars > 1) ? i / (bars - 1) : 0.5)
        const rgb = Math.round(col[0]) + ',' + Math.round(col[1]) + ',' + Math.round(col[2])
        const top = cy - bh, bot = cy + bh
        const g = ctx.createLinearGradient(0, top, 0, bot)
        g.addColorStop(0.0, 'rgba(' + rgb + ',0)'); g.addColorStop(0.5, 'rgba(' + rgb + ',0.85)'); g.addColorStop(1.0, 'rgba(' + rgb + ',0)')
        ctx.fillStyle = g
        const bx = x - bw / 2
        ctx.beginPath()
        if (ctx.roundRect) ctx.roundRect(bx, top, bw, bot - top, radius); else ctx.rect(bx, top, bw, bot - top)
        ctx.fill()
        ctx.fillStyle = 'rgba(' + rgb + ',0.9)'
        ctx.beginPath(); ctx.arc(x, top, radius * 0.9, 0, Math.PI * 2); ctx.fill()
        ctx.beginPath(); ctx.arc(x, bot, radius * 0.9, 0, Math.PI * 2); ctx.fill()
      }
      const lg = ctx.createLinearGradient(0, 0, w, 0)
      lg.addColorStop(0.0, 'rgba(34,211,238,0)'); lg.addColorStop(0.5, 'rgba(168,85,247,0.20)'); lg.addColorStop(1.0, 'rgba(236,72,153,0)')
      ctx.fillStyle = lg; ctx.fillRect(0, cy - 0.75 * dpr, w, 1.5 * dpr); ctx.globalAlpha = 1
    }
    function frame(now) { draw((now - t0) / 1000); raf = requestAnimationFrame(frame) }
    function start() { cancelAnimationFrame(raf); t0 = performance.now(); raf = requestAnimationFrame(frame) }
    function stop() { cancelAnimationFrame(raf) }
    let on = false
    function show() { if (on) return; on = true; c.style.display = ''; if (reduce) { resize(); draw(0) } else { start() } }
    function hide() { if (!on) return; on = false; stop(); c.style.display = 'none' }
    vizApi.current = { show, hide }
    const onResize = () => { resize(); if (on && reduce) draw(0) }
    const onVis = () => { if (!on || reduce) return; document.hidden ? stop() : start() }
    window.addEventListener('resize', onResize, { passive: true })
    document.addEventListener('visibilitychange', onVis)
    resize()
    if (showViz) show(); else hide()
    return () => { stop(); window.removeEventListener('resize', onResize); document.removeEventListener('visibilitychange', onVis); vizApi.current = null }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!vizApi.current) return
    showViz ? vizApi.current.show() : vizApi.current.hide()
  }, [showViz])

  // ===== FUNDO DE ESTRELAS (twinkle + cometas) =====
  useEffect(() => {
    const c = starRef.current
    if (!c) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = c.getContext('2d')
    let w, h, dpr, stars, comets = [], cometTimer = 1200, raf = 0, last = 0
    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = c.width = Math.floor(innerWidth * dpr); h = c.height = Math.floor(innerHeight * dpr)
      c.style.width = innerWidth + 'px'; c.style.height = innerHeight + 'px'
      const count = Math.min(150, Math.floor(innerWidth * innerHeight / 9000))
      stars = []
      for (let i = 0; i < count; i++) {
        const roll = Math.random()
        stars.push({ x: Math.random() * w, y: Math.random() * h, r: (Math.random() * 1.1 + 0.3) * dpr, a: Math.random() * 0.5 + 0.3, tw: Math.random() * 6.283, ts: Math.random() * 0.9 + 0.3, vy: (Math.random() * 0.02 + 0.01) * dpr, hue: roll < 0.15 ? 190 : (roll < 0.5 ? 265 : 220) })
      }
    }
    function drawStars(anim, dt) {
      ctx.clearRect(0, 0, w, h)
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i]; let a = s.a
        if (anim) { s.tw += s.ts * dt * 0.002; a = s.a * (0.55 + 0.45 * Math.sin(s.tw)); s.y += s.vy * dt; if (s.y > h + 2) { s.y = -2; s.x = Math.random() * w } }
        ctx.globalAlpha = a; ctx.fillStyle = 'hsl(' + s.hue + ' 90% 82%)'
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 6.283); ctx.fill()
      }
      ctx.globalAlpha = 1
    }
    function spawnComet() {
      if (comets.length >= 14) return
      const ang = 0.45 + Math.random() * 0.22
      const sp = (Math.random() * 0.6 + 0.7) * dpr
      const len = (Math.random() * 130 + 70) * dpr
      const vx = Math.cos(ang) * sp, vy = Math.sin(ang) * sp
      const tlx = Math.cos(ang) * len, tly = Math.sin(ang) * len
      let x, y
      if (Math.random() < 0.5) { x = Math.random() * (w * 0.9) - w * 0.1; y = -len - Math.random() * (h * 0.15) - 4 * dpr }
      else { x = -len - Math.random() * (w * 0.15) - 4 * dpr; y = Math.random() * (h * 0.6) - h * 0.05 }
      comets.push({ x, y, vx, vy, tlx, tly, len, life: 0, max: 900 + Math.random() * 700 })
    }
    function frame(t) {
      const dt = Math.min(50, t - last); last = t
      drawStars(true, dt)
      cometTimer -= dt
      if (cometTimer <= 0) { spawnComet(); if (Math.random() < 0.5) spawnComet(); if (Math.random() < 0.2) spawnComet(); cometTimer = 450 + Math.random() * 1100 }
      for (let k = comets.length - 1; k >= 0; k--) {
        const m = comets[k]; m.life += dt; const mp = m.life / m.max, ma = Math.max(0, 1 - mp)
        const hx = m.x + m.vx * m.life, hy = m.y + m.vy * m.life, tx = hx - m.tlx, ty = hy - m.tly
        const g = ctx.createLinearGradient(hx, hy, tx, ty)
        g.addColorStop(0, 'rgba(190,242,255,' + ma + ')'); g.addColorStop(1, 'rgba(190,242,255,0)')
        ctx.strokeStyle = g; ctx.lineWidth = 1.7 * dpr; ctx.lineCap = 'round'
        ctx.beginPath(); ctx.moveTo(hx, hy); ctx.lineTo(tx, ty); ctx.stroke()
        ctx.globalAlpha = ma; ctx.fillStyle = 'rgba(225,250,255,' + ma + ')'
        ctx.beginPath(); ctx.arc(hx, hy, 1.5 * dpr, 0, 6.283); ctx.fill(); ctx.globalAlpha = 1
        if (m.life >= m.max || hx > w + m.len || hy > h + m.len) comets.splice(k, 1)
      }
      raf = requestAnimationFrame(frame)
    }
    function start() { cancelAnimationFrame(raf); last = performance.now(); raf = requestAnimationFrame(frame) }
    function stop() { cancelAnimationFrame(raf) }
    resize()
    let on = false
    function show() { if (on) return; on = true; c.style.display = ''; if (reduce) drawStars(false, 0); else start() }
    function hide() { if (!on) return; on = false; stop(); c.style.display = 'none' }
    starApi.current = { show, hide }
    const onResize = () => { resize(); if (on && reduce) drawStars(false, 0) }
    window.addEventListener('resize', onResize, { passive: true })
    let onVis
    if (!reduce) { onVis = () => { if (!on) return; document.hidden ? stop() : start() }; document.addEventListener('visibilitychange', onVis) }
    if (showStars) show(); else hide()
    return () => { stop(); window.removeEventListener('resize', onResize); if (onVis) document.removeEventListener('visibilitychange', onVis); starApi.current = null }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!starApi.current) return
    showStars ? starApi.current.show() : starApi.current.hide()
  }, [showStars])

  return (
    <>
      <div className="fx-aurora" aria-hidden="true"><span className="a1"></span><span className="a2"></span><span className="a3"></span></div>
      <canvas id="musicviz" ref={vizRef} aria-hidden="true"></canvas>
      <canvas id="starfield" ref={starRef} aria-hidden="true"></canvas>
      <div className="fx-vignette" aria-hidden="true"></div>
    </>
  )
}
