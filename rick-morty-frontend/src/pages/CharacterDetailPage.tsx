import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/services/api/client'

export function CharacterDetailPage() {
  const { id } = useParams()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['character', id],
    queryFn: async () => {
      const res = await apiClient.axios.get(`/characters/${id}`)
      return res.data
    },
    enabled: Boolean(id),
  })

  if (isLoading) return <div className="portal-loader mx-auto" />
  if (isError) return <p className="text-red-500">Failed to load character</p>
  if (!data) return null

  const c = data

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Link to="/characters" className="underline text-sm">← Back to list</Link>
        <h2 className="text-2xl font-bold">{c.name}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <img src={c.image} alt={c.name} className="rounded shadow" />
        </div>
        <div className="md:col-span-2 space-y-2 bg-foreground p-4 rounded border border-border">
          <DetailRow label="Status" value={c.status} />
          <DetailRow label="Species" value={c.species} />
          {c.type ? <DetailRow label="Type" value={c.type} /> : null}
          <DetailRow label="Gender" value={c.gender} />
          <DetailRow label="Origin" value={c.origin?.name} />
          <DetailRow label="Location" value={c.location?.name} />
          <DetailRow label="Episodes" value={Array.isArray(c.episode) ? `${c.episode.length}` : '—'} />
        </div>
      </div>
    </div>
  )
}

function DetailRow({ label, value }: { label: string, value?: string }) {
  return (
    <div className="flex gap-2 text-sm">
      <span className="text-textSecondary w-28">{label}:</span>
      <span>{value ?? '—'}</span>
    </div>
  )
}
