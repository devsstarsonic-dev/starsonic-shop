import { createContext, useContext, useState } from 'react'

const PlayerContext = createContext(null)

export function PlayerProvider({ children }) {
  const [track, setTrack] = useState(null) // { title, artist, gradient }
  const [visible, setVisible] = useState(false)

  const play = (t) => { setTrack(t); setVisible(true) }
  const hide = () => setVisible(false)

  return (
    <PlayerContext.Provider value={{ track, visible, play, hide }}>
      {children}
    </PlayerContext.Provider>
  )
}

export const usePlayer = () => useContext(PlayerContext)
