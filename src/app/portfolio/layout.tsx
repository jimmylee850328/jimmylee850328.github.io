import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Showcase of my projects and work',
}

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 