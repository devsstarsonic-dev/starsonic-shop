import { Outlet } from 'react-router-dom'
import Header from './Header.jsx'

// Casca das telas logadas: header fixo + conteúdo da rota.
export default function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}
