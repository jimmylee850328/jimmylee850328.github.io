import { Metadata } from 'next'
import PageTitle from '@/components/PageTitle'

export const metadata: Metadata = {
  title: 'Resume',
  description: 'My professional experience and qualifications',
}

export default function Resume() {
  return (
    <div>
      <PageTitle title="Resume" />
      <div className="prose prose-invert max-w-none">
        <p className="text-xl text-text-secondary leading-relaxed mb-6">
          This is my resume page. Here you can find my professional experience, education, and skills.
        </p>
        <p className="text-lg text-text-secondary leading-relaxed mb-8">
          More detailed resume content will be added here soon.
        </p>
      </div>
    </div>
  )
} 