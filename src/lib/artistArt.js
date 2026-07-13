// Arte procedural (SVG string) usada via dangerouslySetInnerHTML — porte fiel do HTML.

export function songCover(i, title) {
  var pal = [
    ['#22d3ee', '#6366f1'], ['#a855f7', '#ec4899'], ['#fb7185', '#f97316'],
    ['#34d399', '#22d3ee'], ['#818cf8', '#c084fc'], ['#f59e0b', '#f43f5e'],
    ['#38bdf8', '#8b5cf6'], ['#2dd4bf', '#6366f1'],
  ]
  var c = pal[i % pal.length]
  var m = i % 3
  var initial = (((title || '?').trim()[0]) || '?').toUpperCase()
  var gid = 'cg' + i + '_' + Math.random().toString(36).slice(2, 7)

  var motif = ''
  if (m === 0) {
    motif =
      '<g fill="none" stroke="#ffffff" stroke-opacity="0.16">' +
        '<circle cx="70" cy="30" r="26" stroke-width="2"/>' +
        '<circle cx="70" cy="30" r="18" stroke-width="2"/>' +
        '<circle cx="70" cy="30" r="10" stroke-width="2"/>' +
      '</g><circle cx="70" cy="30" r="3.2" fill="#ffffff" fill-opacity="0.5"/>'
  } else if (m === 1) {
    var hs = [30, 52, 40, 66, 46, 58, 34, 50]
    for (var b = 0; b < hs.length; b++) {
      motif += '<rect x="' + (40 + b * 7.2) + '" y="' + (96 - hs[b]) +
               '" width="4.2" height="' + hs[b] + '" rx="2.1" fill="#ffffff" fill-opacity="0.16"/>'
    }
  } else {
    motif =
      '<path d="M-2 60 Q 20 44 42 60 T 86 60 T 130 60" fill="none" stroke="#ffffff" stroke-opacity="0.18" stroke-width="3"/>' +
      '<path d="M-2 73 Q 22 57 44 73 T 88 73 T 132 73" fill="none" stroke="#ffffff" stroke-opacity="0.12" stroke-width="3"/>'
  }

  return '' +
    '<svg class="cover-svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' +
      '<defs><linearGradient id="' + gid + '" x1="0" y1="0" x2="1" y2="1">' +
        '<stop offset="0" stop-color="' + c[0] + '"/><stop offset="1" stop-color="' + c[1] + '"/>' +
      '</linearGradient></defs>' +
      '<rect width="100" height="100" fill="url(#' + gid + ')"/>' +
      '<circle cx="18" cy="92" r="42" fill="#0a0a2e" fill-opacity="0.18"/>' +
      '<circle cx="84" cy="12" r="24" fill="#ffffff" fill-opacity="0.12"/>' +
      motif +
      '<text x="11" y="88" font-family="Inter, system-ui, sans-serif" font-size="44" font-weight="800" ' +
        'fill="#ffffff" fill-opacity="0.85" stroke="#0a0a2e" stroke-opacity="0.12" stroke-width="0.6">' + initial + '</text>' +
    '</svg>'
}

export function fmtNum(n) {
  if (n >= 1000000) { var mm = (n / 1000000).toFixed(1); if (mm.slice(-2) === '.0') mm = mm.slice(0, -2); return mm.replace('.', ',') + ' mi' }
  if (n >= 1000) { var k = (n / 1000).toFixed(1); if (k.slice(-2) === '.0') k = k.slice(0, -2); return k.replace('.', ',') + ' mil' }
  return n.toLocaleString('pt-BR')
}

export function artistHero(a) {
  var h = a.hero || ['#312e81', '#7c3aed', '#ec4899']
  var initials = a.initials || (a.name ? a.name[0] : '')
  var seed = ((a.name || 'x').length * 37 + 11) >>> 0
  function rnd() { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff }

  var stars = ''
  for (var i = 0; i < 72; i++) {
    var x = (rnd() * 1200).toFixed(1), y = (rnd() * 600).toFixed(1)
    var r = (rnd() * 1.5 + 0.3).toFixed(2), o = (rnd() * 0.55 + 0.12).toFixed(2)
    stars += '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="#fff" opacity="' + o + '"/>'
  }

  var cX = [820, 890, 965, 1030, 1075, 940]
  var cY = [110, 165, 132, 195, 250, 235]
  var con = '<g stroke="#a5f3fc" stroke-opacity="0.32" stroke-width="1.1" fill="none">'
  for (var k = 0; k < cX.length - 1; k++) con += '<line x1="' + cX[k] + '" y1="' + cY[k] + '" x2="' + cX[k + 1] + '" y2="' + cY[k + 1] + '"/>'
  con += '</g>'
  for (var k2 = 0; k2 < cX.length; k2++) con += '<circle cx="' + cX[k2] + '" cy="' + cY[k2] + '" r="' + (k2 === 0 ? 2.6 : 2) + '" fill="#e0f2fe"/>'
  con += '<g transform="translate(' + cX[0] + ',' + cY[0] + ')" fill="#ffffff" opacity="0.95">' +
    '<path d="M0 -13 L2.2 -2.2 L13 0 L2.2 2.2 L0 13 L-2.2 2.2 L-13 0 L-2.2 -2.2 Z"/></g>'

  var rings = '<g fill="none" stroke="#67e8f9" stroke-opacity="0.13">' +
    '<circle cx="150" cy="470" r="130" stroke-width="2"/>' +
    '<circle cx="150" cy="470" r="220" stroke-width="1.6"/>' +
    '<circle cx="150" cy="470" r="315" stroke-width="1.2"/></g>'

  return '' +
    '<svg viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">' +
      '<defs>' +
        '<linearGradient id="ahg" x1="0" y1="0" x2="1" y2="1">' +
          '<stop offset="0" stop-color="' + h[0] + '"/><stop offset="0.5" stop-color="' + h[1] + '"/><stop offset="1" stop-color="' + h[2] + '"/></linearGradient>' +
        '<radialGradient id="ahr1" cx="0.82" cy="0.16" r="0.6"><stop offset="0" stop-color="' + h[2] + '" stop-opacity="0.6"/><stop offset="1" stop-color="' + h[2] + '" stop-opacity="0"/></radialGradient>' +
        '<radialGradient id="ahcore" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#ffffff" stop-opacity="0.85"/><stop offset="0.28" stop-color="#a5f3fc" stop-opacity="0.5"/><stop offset="1" stop-color="#22d3ee" stop-opacity="0"/></radialGradient>' +
        '<linearGradient id="ahaur" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#22d3ee" stop-opacity="0"/><stop offset="0.5" stop-color="#8b5cf6" stop-opacity="0.55"/><stop offset="1" stop-color="#ec4899" stop-opacity="0"/></linearGradient>' +
      '</defs>' +
      '<rect width="1200" height="600" fill="url(#ahg)"/>' +
      '<rect width="1200" height="600" fill="url(#ahr1)"/>' +
      '<g opacity="0.5"><ellipse cx="600" cy="235" rx="740" ry="92" fill="url(#ahaur)" transform="rotate(-8 600 235)"/></g>' +
      '<g opacity="0.34"><ellipse cx="650" cy="430" rx="770" ry="82" fill="url(#ahaur)" transform="rotate(6 650 430)"/></g>' +
      rings +
      '<circle cx="150" cy="470" r="300" fill="url(#ahcore)"/>' +
      stars +
      con +
      '<text x="1150" y="330" text-anchor="end" font-family="Inter, system-ui, sans-serif" font-size="380" font-weight="900" fill="#ffffff" opacity="0.08" dominant-baseline="central">' + initials + '</text>' +
    '</svg>'
}
