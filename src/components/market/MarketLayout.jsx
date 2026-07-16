import { Outlet, useLocation } from 'react-router-dom'
import TopNav from './TopNav.jsx'
import StickyPlayer from './StickyPlayer.jsx'

// Casca das telas de marketplace: nav completa + conteúdo com transição + player sticky.
export default function MarketLayout() {
  const { pathname } = useLocation()
  return (
    <>
      <TopNav />
      <main key={pathname} className="page-enter" style={{ paddingBottom: 120 }}>
        <Outlet />
      </main>
      <StickyPlayer />
    </>
  )
}
