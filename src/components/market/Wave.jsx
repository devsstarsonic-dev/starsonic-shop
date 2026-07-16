// Equalizer decorativo — barras com altura pseudo-aleatória determinística (sem estado, sem animação JS).
const heights = (n, seed) => Array.from({ length: n }, (_, i) => 30 + ((seed + i * 37) % 65))

export default function Wave({ bars = 10, height = 28, seed = 3, purple = false }) {
  return (
    <div className="wave" style={{ height }} aria-hidden="true">
      {heights(bars, seed).map((h, i) => (
        <div key={i} className={`wave-bar${purple ? ' wave-bar-purple' : ''}`} style={{ height: `${h}%` }} />
      ))}
    </div>
  )
}
