import JobCard from '../components/jobs/JobCard.jsx'
import { useState } from 'react'

const sampleJobs = [
  { id: 1, title: 'Build a responsive website', description: 'Need a frontend developer to build a responsive landing page using React.' },
  { id: 2, title: 'Design a logo', description: 'Looking for a designer to create a modern logo for our startup.' },
  { id: 3, title: 'SEO audit', description: 'Perform an SEO audit and provide actionable recommendations.' },
]

export default function Home() {
  const [query, setQuery] = useState('')

  const filtered = sampleJobs.filter(j =>
    j.title.toLowerCase().includes(query.toLowerCase()) ||
    j.description.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold text-slate-900">Find the right freelancer for your project</h1>
            <p className="mt-4 text-slate-600">Post a job, browse proposals, and hire trusted talent.</p>

            <div className="mt-6 flex gap-2">
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="flex-1 rounded border px-4 py-3"
                placeholder="Search jobs, skills, or keywords"
              />
              <button className="rounded bg-indigo-600 text-white px-4 py-3">Search</button>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Featured Jobs</h2>
          <a href="/jobs" className="text-indigo-600">View all</a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filtered.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </section>
    </main>
  )
}
