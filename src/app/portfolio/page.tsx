import { Metadata } from 'next'
import PageTitle from '@/components/PageTitle'

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'My projects and work samples',
}

export default function Portfolio() {
  return (
    <div>
      <PageTitle title="Portfolio" />
      <div className="prose prose-invert max-w-none">
        <p className="text-xl text-text-secondary leading-relaxed mb-6">
          This is my portfolio page. Here you can explore my projects and work samples.
        </p>
        <p className="text-lg text-text-secondary leading-relaxed mb-8">
          More detailed portfolio content will be added here soon.
        </p>
      </div>
    </div>
  )
} 