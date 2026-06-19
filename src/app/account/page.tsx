import type { Metadata } from 'next'
import { AccountDashboard } from './account-dashboard'

export const metadata: Metadata = {
  title: 'Moje konto',
  description: 'Panel klienta Serum Global – ranga w Składzie Serum, punkty, rabaty, zamówienia i lista życzeń.',
}

export default function AccountPage() {
  return <AccountDashboard />
}
