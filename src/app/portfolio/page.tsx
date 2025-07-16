'use client'

import PageTitle from '@/components/PageTitle'
import Link from 'next/link'

export default function Portfolio() {
  const projects = [
    {
      id: 'infinite-scroll-gallery',
      title: 'Infinite Scroll Gallery',
      description: 'React-based infinite scroll gallery with dog images',
      image: '/api/placeholder/400/300',
      tags: ['React', 'TypeScript', 'Next.js', 'API'],
      href: '/portfolio/infinite-scroll-gallery'
    }
  ]

  return (
    <div>
      <PageTitle title="Portfolio" />
      
      <div className="prose prose-invert max-w-none mb-12">
        <p className="text-xl text-text-secondary leading-relaxed mb-6">
          Explore my projects and work samples. Each project showcases different technologies and problem-solving approaches.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div 
            key={project.id}
            className="group relative bg-card-dark rounded-xl border border-border-dark overflow-hidden"
          >
            {/* Project Image */}
            <Link href={project.href} className="block">
              <div className="relative aspect-video bg-gradient-to-br from-accent-dark/20 to-highlight/20 overflow-hidden group/image">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-accent-dark/30 rounded-full flex items-center justify-center mb-4 mx-auto">
                      <svg className="w-8 h-8 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <p className="text-text-secondary text-sm">Project Preview</p>
                  </div>
                </div>
                
                {/* Hover Overlay with Eye Icon - Only on image hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-white/10 backdrop-blur-sm rounded-full p-4 border border-white/20">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>

            {/* Project Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-text-primary mb-2">
                {project.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {project.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 