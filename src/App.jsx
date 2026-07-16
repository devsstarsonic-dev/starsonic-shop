import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Backgrounds from './components/effects/Backgrounds.jsx'
import ProtectedRoute from './auth/ProtectedRoute.jsx'
import { CartProvider } from './cart/CartContext.jsx'
import { PlayerProvider } from './player/PlayerContext.jsx'
import { ToastProvider } from './components/Toast.jsx'
import MarketLayout from './components/market/MarketLayout.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Home from './pages/market/Home.jsx'
import Explore from './pages/market/Explore.jsx'
import Genre from './pages/market/Genre.jsx'
import Song from './pages/market/Song.jsx'
import Composer from './pages/market/Composer.jsx'
import CartPage from './pages/market/Cart.jsx'
import Library from './pages/market/Library.jsx'
import FavoritesPage from './pages/market/FavoritesPage.jsx'
import OrdersPage from './pages/market/OrdersPage.jsx'
import AccountDataPage from './pages/market/AccountDataPage.jsx'
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
    <CartProvider>
      <PlayerProvider>
        <ToastProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route element={<ProtectedRoute />}>
              <Route element={<MarketLayout />}>
                <Route path="/inicio" element={<Home />} />
                <Route path="/explorar" element={<Explore />} />
                <Route path="/genero/:slug" element={<Genre />} />
                <Route path="/musica/:id" element={<Song />} />
                <Route path="/artista/:slug" element={<Artist />} />
                <Route path="/compositor/:slug" element={<Composer />} />
                <Route path="/carrinho" element={<CartPage />} />
                <Route path="/biblioteca" element={<Library />} />
                <Route path="/favoritos" element={<FavoritesPage />} />
                <Route path="/encomendas" element={<OrdersPage />} />
                <Route path="/conta/dados" element={<AccountDataPage />} />
                <Route path="/encomendar" element={<NewOrder />} />
                <Route path="/encomendar/personalizada" element={<RequestCustom />} />
                <Route path="/encomenda/aprovar" element={<ApproveSong />} />
                <Route path="/encomenda/alteracao" element={<RequestChanges />} />
              </Route>
            </Route>

            {/* back-compat: rotas antigas /app/* */}
            <Route path="/app" element={<Navigate to="/biblioteca" replace />} />
            <Route path="/app/musicas" element={<Navigate to="/biblioteca" replace />} />
            <Route path="/app/encomendas" element={<Navigate to="/encomendas" replace />} />
            <Route path="/app/favoritos" element={<Navigate to="/favoritos" replace />} />
            <Route path="/app/dados" element={<Navigate to="/conta/dados" replace />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ToastProvider>
      </PlayerProvider>
    </CartProvider>
    </>
  )
}
