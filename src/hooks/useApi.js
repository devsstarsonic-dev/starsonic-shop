import { useEffect, useState } from 'react'

// Uma chamada assíncrona → { data, error, loading }. Cancela se desmontar.
export function useApi(fn, deps = []) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  useEffect(() => {
    let alive = true
    fn().then(d => alive && setData(d)).catch(e => alive && setError(e))
    return () => { alive = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
  return { data, error, loading: !data && !error }
}
