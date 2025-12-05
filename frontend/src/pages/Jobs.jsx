import { useEffect, useState } from 'react'
import { useJobStore } from '../store/useJobStore.js'
import JobFilter from '../components/jobs/JobFilter.jsx'
import JobPostForm from '../components/jobs/JobPostForm.jsx'

export default function Jobs() {
  const { jobs, loading, error, fetchJobs } = useJobStore()
  const [filters, setFilters] = useState({})

  useEffect(() => {
    fetchJobs(filters)
  }, [fetchJobs, JSON.stringify(filters)])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Jobs</h1>
        <JobFilter onChange={setFilters} />
      </div>

      {loading && <p className="text-sm">Loading jobs...</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 grid gap-4 sm:grid-cols-2">
          {jobs.map((j) => (
            <div key={j.id || j._id} className="rounded border p-4 bg-white">
              <h3 className="font-medium">{j.title}</h3>
              <p className="text-sm text-slate-600 line-clamp-3">{j.description}</p>
            </div>
          ))}
        </div>
        <div className="md:col-span-1 bg-white border rounded p-4">
          <h2 className="font-medium mb-2">Post a job</h2>
          <JobPostForm onCreated={() => fetchJobs(filters)} />
        </div>
      </div>
    </div>
  )
}
