export const formatPrice = (cents) => `R$ ${(cents / 100).toFixed(2).replace('.', ',')}`
export const formatDuration = (sec) => `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')}`
export const formatCompact = (n) => n >= 1000000 ? `${(n / 1000000).toFixed(1)}M` : n >= 1000 ? `${(n / 1000).toFixed(1)}K` : String(n)
