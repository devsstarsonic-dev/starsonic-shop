import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Backgrounds from './components/effects/Backgrounds.jsx'
import ProtectedRoute from './auth/ProtectedRoute.jsx'
import Layout from './components/Layout.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Account from './pages/Account.jsx'
import Purchases from './pages/Purchases.jsx'
import Orders from './pages/Orders.jsx'
import Favorites from './pages/Favorites.jsx'
import AccountData from './pages/AccountData.jsx'
import NewOrder from './pages/NewOrder.jsx'
import RequestCustom from './pages/RequestCustom.jsx'
import ApproveSong from './pages/ApproveSong.jsx'
import RequestChanges from './pages/RequestChanges.jsx'
import Artist from './pages/Artist.jsx'

export default function App() {
  const { pathname } = useLocation()
  const onAuth = pathname === '/' || pathname === '/signup'
  return (
    <>
    <Backgrounds showViz={onAuth} showStars={onAuth} />
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/app" element={<Account />}>
            <Route index element={<Navigate to="musicas" replace />} />
            <Route path="musicas" element={<Purchases />} />
            <Route path="encomendas" element={<Orders />} />
            <Route path="favoritos" element={<Favorites />} />
            <Route path="dados" element={<AccountData />} />
          </Route>
          <Route path="/encomendar" element={<NewOrder />} />
          <Route path="/encomendar/personalizada" element={<RequestCustom />} />
          <Route path="/encomenda/aprovar" element={<ApproveSong />} />
          <Route path="/encomenda/alteracao" element={<RequestChanges />} />
          <Route path="/artista/:slug" element={<Artist />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    </>
  )
}
