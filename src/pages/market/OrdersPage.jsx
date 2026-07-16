import PageHeader from '../../components/market/PageHeader.jsx'
import Orders from '../Orders.jsx'

export default function OrdersPage() {
  return (
    <div className="content-wrap">
      <PageHeader eyebrow="Suas encomendas" title="Encomendas" />
      <Orders />
    </div>
  )
}
