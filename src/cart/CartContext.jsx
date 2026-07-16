import { createContext, useContext, useMemo, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])

  const add = (item) => {
    setItems((list) => {
      if (list.some((i) => i.cartId === item.cartId)) return list
      return [...list, item]
    })
  }
  const remove = (cartId) => setItems((list) => list.filter((i) => i.cartId !== cartId))
  const clear = () => setItems([])

  const total = useMemo(() => items.reduce((sum, i) => sum + i.priceCents, 0), [items])
  const count = items.length

  return (
    <CartContext.Provider value={{ items, add, remove, clear, total, count }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
