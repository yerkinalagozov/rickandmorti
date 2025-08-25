import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams, Link } from 'react-router-dom'
import { apiClient } from '@/services/api/client'

const ENTITIES = ['characters', 'episodes', 'locations'] as const

type Entity = typeof ENTITIES[number]

export function SearchPage() {
  const [params, setParams] = useSearchParams()
  const q = params.get('q') || ''
  const entity = (params.get('entity') as Entity) || 'characters'

  const setEntity = (e: Entity) => {
    const next = new URLSearchParams(params)
    next.set('entity', e)
    setParams(next, { replace: true })
  }

  const setQuery = (value: string) => {
    const next = new URLSearchParams(params)
    if (value) next.set('q', value)
    else next.delete('q')
    setParams(next, { replace: true })
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ['search', entity, q],
    queryFn: async () => {
      const endpoint = entity === 'characters' ? '/characters' : entity === 'episodes' ? '/episodes' : '/locations'
      const res = await apiClient.axios.get(endpoint, { params: { name: q || undefined, page: 1 } })
      return res.data
    },
    enabled: true,
  })

  const items: any[] = useMemo(() => (data?.results || data?.data || []), [data])

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <input
          value={q}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name..."
          className="w-full md:w-1/2 bg-foreground text-text rounded px-3 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <EntityTabs value={entity} onChange={setEntity} />
      </div>

      {isLoading && <div className="portal-loader mx-auto" />}
      {isError && <p className="text-red-500">Failed to load results</p>}
      {!isLoading && !isError && items.length === 0 && (
        <p className="text-textSecondary">No results found. Try another query.</p>
      )}

      {!isLoading && !isError && items.length > 0 && (
        <ResultsGrid entity={entity} items={items} />)
      }

      <p className="text-sm text-textSecondary">
        Tip: You can share search with a link. For example: <Link to={`/search?entity=${entity}&q=rick`} className="underline">/search?entity={entity}&q=rick</Link>
      </p>
    </div>
  )
}

function EntityTabs({ value, onChange }: { value: Entity, onChange: (e: Entity) => void }) {
  return (
    <div className="inline-flex bg-foreground rounded-md p-1 border border-border">
      {ENTITIES.map(e => (
        <button
          key={e}
          onClick={() => onChange(e)}
          className={`px-3 py-1 rounded ${value === e ? 'bg-accent text-white' : 'hover:bg-muted'}`}
        >
          {e.charAt(0).toUpperCase() + e.slice(1)}
        </button>
      ))}
    </div>
  )
}

function ResultsGrid({ entity, items }: { entity: Entity, items: any[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((it: any) => (
        <Card key={it.id} entity={entity} item={it} />
      ))}
    </div>
  )
}

function Card({ entity, item }: { entity: Entity, item: any }) {
  if (entity === 'characters') {
    return (
      <Link to={`/characters/${item.id}`} className="bg-foreground rounded shadow p-3 block hover:bg-muted">
        <img src={item.image} alt={item.name} className="rounded mb-2" />
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-sm text-textSecondary">{item.status} • {item.species}</p>
        <p className="text-sm text-textSecondary">Location: {item.location?.name}</p>
      </Link>
    )
  }
  if (entity === 'episodes') {
    return (
      <div className="bg-foreground rounded shadow p-3">
        <h3 className="font-semibold mb-1">{item.name}</h3>
        <p className="text-sm text-textSecondary">Code: {item.episode}</p>
        <p className="text-sm text-textSecondary">Air date: {item.air_date}</p>
      </div>
    )
  }
  // locations
  return (
    <div className="bg-foreground rounded shadow p-3">
      <h3 className="font-semibold mb-1">{item.name}</h3>
      <p className="text-sm text-textSecondary">Type: {item.type}</p>
      <p className="text-sm text-textSecondary">Dimension: {item.dimension}</p>
    </div>
  )
}
