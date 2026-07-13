import { useEffect } from 'react'

// BorderGlow (luz conica que segue o cursor) + Tilt 3D com parallax, da tela de login.
// Port fiel dos IIFEs do HTML; roda enquanto o componente estiver montado.
export function useLoginFx({ sceneRef, tiltRef, cardRef }) {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const cleanups = []

    // ===== BorderGlow =====
    const card = cardRef.current
    if (card) {
      const center = (el) => { const r = el.getBoundingClientRect(); return [r.width / 2, r.height / 2] }
      const edgeProximity = (el, x, y) => {
        const c = center(el), dx = x - c[0], dy = y - c[1]; let kx = Infinity, ky = Infinity
        if (dx !== 0) kx = c[0] / Math.abs(dx); if (dy !== 0) ky = c[1] / Math.abs(dy)
        return Math.min(Math.max(1 / Math.min(kx, ky), 0), 1)
      }
      const cursorAngle = (el, x, y) => {
        const c = center(el), dx = x - c[0], dy = y - c[1]
        if (dx === 0 && dy === 0) return 0
        let deg = Math.atan2(dy, dx) * (180 / Math.PI) + 90; if (deg < 0) deg += 360; return deg
      }
      const trackPointer = (e) => {
        if (card.offsetParent === null) return
        const r = card.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top
        card.style.setProperty('--edge-proximity', (edgeProximity(card, x, y) * 100).toFixed(3))
        card.style.setProperty('--cursor-angle', cursorAngle(card, x, y).toFixed(3) + 'deg')
      }
      const easeOutCubic = (x) => 1 - Math.pow(1 - x, 3)
      const easeInCubic = (x) => x * x * x
      const animateValue = (o) => {
        const start = (o.start != null ? o.start : 0), end = (o.end != null ? o.end : 100), dur = o.duration || 1000, delay = o.delay || 0, ease = o.ease || easeOutCubic
        setTimeout(() => { const t0 = performance.now(); (function tick() { const t = Math.min((performance.now() - t0) / dur, 1); o.onUpdate(start + (end - start) * ease(t)); if (t < 1) requestAnimationFrame(tick); else if (o.onEnd) o.onEnd() })() }, delay)
      }
      const sweep = () => {
        if (reduce) return
        const aS = 110, aE = 465
        card.classList.add('sweep-active')
        card.style.setProperty('--cursor-angle', aS + 'deg')
        animateValue({ duration: 500, onUpdate: (v) => card.style.setProperty('--edge-proximity', v) })
        animateValue({ ease: easeInCubic, duration: 1500, end: 50, onUpdate: (v) => card.style.setProperty('--cursor-angle', ((aE - aS) * (v / 100) + aS) + 'deg') })
        animateValue({ ease: easeOutCubic, delay: 1500, duration: 2250, start: 50, end: 100, onUpdate: (v) => card.style.setProperty('--cursor-angle', ((aE - aS) * (v / 100) + aS) + 'deg') })
        animateValue({ ease: easeInCubic, delay: 2500, duration: 1500, start: 100, end: 0, onUpdate: (v) => card.style.setProperty('--edge-proximity', v), onEnd: () => card.classList.remove('sweep-active') })
      }
      const noHover = window.matchMedia('(hover: none), (pointer: coarse)').matches
      let orbitRAF = 0
      const startOrbit = () => {
        card.style.setProperty('--edge-proximity', '60')
        if (reduce) { card.style.setProperty('--cursor-angle', '130deg'); return }
        cancelAnimationFrame(orbitRAF)
        const t0 = performance.now()
        ;(function orbit(t) { if (t == null) t = performance.now(); const deg = (((t - t0) / 9000) * 360) % 360; card.style.setProperty('--cursor-angle', deg.toFixed(2) + 'deg'); orbitRAF = requestAnimationFrame(orbit) })(performance.now())
      }
      if (noHover) { startOrbit(); cleanups.push(() => cancelAnimationFrame(orbitRAF)) }
      else { window.addEventListener('pointermove', trackPointer, { passive: true }); sweep(); cleanups.push(() => window.removeEventListener('pointermove', trackPointer)) }
    }

    // ===== Tilt 3D =====
    const scene = sceneRef.current, el = tiltRef.current
    if (!reduce && scene && el) {
      const MAX = 5, LIFT = 12
      let tgtRX = 0, tgtRY = 0, curRX = 0, curRY = 0, tgtPX = 0, tgtPY = 0, curPX = 0, curPY = 0, tgtL = 0, curL = 0, lastInput = 0, raf = 0, hovering = false
      const aim = (px, py) => { px = Math.max(-1, Math.min(1, px)); py = Math.max(-1, Math.min(1, py)); tgtPX = px; tgtPY = py; tgtRY = px * MAX; tgtRX = -py * MAX; lastInput = performance.now() }
      const aimFromClient = (x, y) => { const r = scene.getBoundingClientRect(); aim((x - (r.left + r.width / 2)) / (r.width / 2), (y - (r.top + r.height / 2)) / (r.height / 2)) }
      const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
      const card2 = cardRef.current
      const onMove = (e) => aimFromClient(e.clientX, e.clientY)
      const onOut = (e) => { if (!e.relatedTarget) lastInput = 0 }
      const onEnter = () => { hovering = true }
      const onLeave = () => { hovering = false }
      let onOrient
      if (fine) {
        window.addEventListener('pointermove', onMove, { passive: true })
        window.addEventListener('pointerout', onOut, { passive: true })
        if (card2) { card2.addEventListener('pointerenter', onEnter); card2.addEventListener('pointerleave', onLeave) }
        cleanups.push(() => { window.removeEventListener('pointermove', onMove); window.removeEventListener('pointerout', onOut); if (card2) { card2.removeEventListener('pointerenter', onEnter); card2.removeEventListener('pointerleave', onLeave) } })
      } else {
        onOrient = (ev) => { if (ev.gamma == null && ev.beta == null) return; const g = Math.max(-30, Math.min(30, ev.gamma || 0)); const b = Math.max(-30, Math.min(30, (ev.beta || 0) - 45)); aim(g / 30, b / 30) }
        const DOE = window.DeviceOrientationEvent
        if (DOE) { window.addEventListener('deviceorientation', onOrient, { passive: true }); cleanups.push(() => window.removeEventListener('deviceorientation', onOrient)) }
      }
      const frame = (t) => {
        if (t - lastInput > 2600) { const s = t / 1000; tgtPX = Math.sin(s * 0.55) * 0.42; tgtPY = Math.cos(s * 0.48) * 0.28; tgtRY = tgtPX * MAX; tgtRX = -tgtPY * MAX }
        tgtL = hovering ? LIFT : 0
        curRX += (tgtRX - curRX) * 0.085; curRY += (tgtRY - curRY) * 0.085
        curPX += (tgtPX - curPX) * 0.10; curPY += (tgtPY - curPY) * 0.10; curL += (tgtL - curL) * 0.10
        el.style.transform = 'rotateX(' + curRX.toFixed(2) + 'deg) rotateY(' + curRY.toFixed(2) + 'deg) translateZ(' + curL.toFixed(1) + 'px)'
        scene.style.setProperty('--px', curPX.toFixed(3)); scene.style.setProperty('--py', curPY.toFixed(3))
        raf = requestAnimationFrame(frame)
      }
      raf = requestAnimationFrame(frame)
      cleanups.push(() => cancelAnimationFrame(raf))
    }

    return () => cleanups.forEach((fn) => fn())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
