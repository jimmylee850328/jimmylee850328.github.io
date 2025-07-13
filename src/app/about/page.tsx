import { Metadata } from 'next'
import PageTitle from '@/components/PageTitle'

export const metadata: Metadata = {
  title: 'About Me',
  description: 'Frontend Engineer specializing in modern web development, team collaboration, and AI-enhanced development workflows',
}

export default function About() {
  return (
    <div>
      {/* Header */}
      <div className="mb-12">
        <PageTitle title="About Me" />
        <div className="prose prose-invert max-w-none">
          <p className="text-xl text-text-secondary leading-relaxed mb-6">
            I&apos;m a Frontend Engineer with a strong focus on modern web development and team collaboration. 
            I build scalable, user-friendly applications and enjoy mentoring developers to grow both individually 
            and as a team.
          </p>
          <p className="text-lg text-text-secondary leading-relaxed mb-8">
            I believe the value of a software engineer lies in solving real problems with clear, maintainable solutions. 
            I&apos;m enthusiastic about AI tools that enhance productivity—like Cursor, Claude and n8n —and I occasionally 
            explore image and video generation with GPT and Veo3. I enjoy collaborative environments where I can both 
            learn from others and share what I know.
          </p>
        </div>
      </div>

      {/* What I'm Doing Section */}
      <section>
        <h2 className="text-3xl font-bold text-text-primary mb-8">What I&apos;m Doing</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-card-dark p-6 rounded-xl border border-border-dark">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">Frontend Development</h3>
                <p className="text-text-secondary">Expert in Next.js and Vue.js ecosystems, developing SaaS platforms, dashboards, and enterprise web applications.</p>
              </div>
            </div>
          </div>

          <div className="bg-card-dark p-6 rounded-xl border border-border-dark">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">API Integration</h3>
                <p className="text-text-secondary">Skilled in GraphQL, REST APIs, and data visualization using D3.js, Leaflet.js, and ECharts for interactive experiences.</p>
              </div>
            </div>
          </div>

          <div className="bg-card-dark p-6 rounded-xl border border-border-dark">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">Team Leadership</h3>
                <p className="text-text-secondary">Experienced in mentoring developers, conducting code reviews, and organizing technical training programs for team growth.</p>
              </div>
            </div>
          </div>

          <div className="bg-card-dark p-6 rounded-xl border border-border-dark">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">AI-Enhanced Development</h3>
                <p className="text-text-secondary">Embracing AI tools like Cursor, Claude, and n8n to solve problems more efficiently and explore creative possibilities in development.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 