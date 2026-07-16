import PageHeader from '../../components/market/PageHeader.jsx'
import AccountData from '../AccountData.jsx'

export default function AccountDataPage() {
  return (
    <div className="content-wrap">
      <PageHeader eyebrow="Sua conta" title="Meus dados" />
      <AccountData />
    </div>
  )
}
