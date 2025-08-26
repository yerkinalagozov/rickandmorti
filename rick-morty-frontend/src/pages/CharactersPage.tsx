import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { apiClient } from '@/services/api/client'
import { Link } from 'react-router-dom'

const STATUS = ['', 'alive', 'dead', 'unknown'] as const
const GENDER = ['', 'female', 'male', 'genderless', 'unknown'] as const
const SPECIES = [
  'Human',
  'Alien',
  'Humanoid',
  'Animal',
  'Robot',
  'Cronenberg',
  'Disease',
  'Poopybutthole',
  'Mythological Creature',
  'Vampire',
  'Parasite',
  'Unknown',
  'Superhuman',
  'Fish-Person',
  'Bird-Person',
  'Cat',
  'Dog',
  'Amphibian',
  'Gromflomite',
] as const

const TYPES = [
  "Rick's Toxic Side",
  "Morty's Toxic Side",
  'Clone',
  'Parasite',
  'Vampire',
  'Human with Antenna',
  'Human with Cronenberg Head',
  'Mega Gargantuan',
  'Sentient Ant Colony',
  'Cat controlled dead lady',
  'Soulless Puppet',
  'Artificial Intelligence',
  'Gromflomite',
  'Superhuman',
  'Phone-Person',
  'Fish-Person',
  'Time God',
  'Robot-Crocubot',
  'Bird-Person',
  'Zigerion',
] as const

type Filters = {
  page?: number
  name?: string
  status?: typeof STATUS[number]
  species?: string
  type?: string
  gender?: typeof GENDER[number]
}

export function CharactersPage() {
  const [params, setParams] = useSearchParams()
  const page = Math.max(1, parseInt(params.get('page') || '1', 10) || 1)
  const filters: Filters = {
    page,
    name: params.get('name') || undefined,
    status: (params.get('status') as Filters['status']) || undefined,
    species: params.get('species') || undefined,
    type: params.get('type') || undefined,
    gender: (params.get('gender') as Filters['gender']) || undefined,
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ['characters', filters],
    queryFn: async () => {
      const res = await apiClient.axios.get('/characters', { params: filters })
      return res.data
    },
    placeholderData: (previousData) => previousData,
  })

  const items = useMemo(() => (data?.data ?? data?.results ?? [] as any[]), [data])
  const info = data?.info || undefined

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    // Reset page on filter change
    if (key !== 'page') next.set('page', '1')
    setParams(next, { replace: true })
  }

  const setPage = (p: number) => updateParam('page', String(Math.max(1, p)))

  return (
    <div className="space-y-4">
      <div className="bg-foreground p-3 rounded border border-border grid grid-cols-1 md:grid-cols-5 gap-2">
        <input
          placeholder="Name"
          defaultValue={filters.name || ''}
          onChange={(e) => updateParam('name', e.target.value)}
          className="bg-background rounded px-3 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <select
          value={filters.status || ''}
          onChange={(e) => updateParam('status', e.target.value)}
          className="bg-background rounded px-3 py-2 border border-border"
        >
          {STATUS.map(s => <option key={s} value={s}>{s || 'Any status'}</option>)}
        </select>
        <input
          placeholder="Species"
          defaultValue={filters.species || ''}
          onChange={(e) => updateParam('species', e.target.value)}
          list="species-list"
          className="bg-background rounded px-3 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <datalist id="species-list">
          {SPECIES.map(s => <option key={s} value={s} />)}
        </datalist>
        <input
          placeholder="Type"
          defaultValue={filters.type || ''}
          onChange={(e) => updateParam('type', e.target.value)}
          list="type-list"
          className="bg-background rounded px-3 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <datalist id="type-list">
          {TYPES.map(t => <option key={t} value={t} />)}
        </datalist>
        <select
          value={filters.gender || ''}
          onChange={(e) => updateParam('gender', e.target.value)}
          className="bg-background rounded px-3 py-2 border border-border"
        >
          {GENDER.map(g => <option key={g} value={g}>{g || 'Any gender'}</option>)}
        </select>
      </div>

      {isLoading && <div className="portal-loader mx-auto" />}
      {isError && <p className="text-red-500">Failed to load characters</p>}

      {!isLoading && !isError && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {items.map((c: any) => (
              <Link to={`/characters/${c.id}`} key={c.id} className="bg-foreground rounded shadow-md p-3 block hover:bg-muted">
                <img src={c.image} alt={c.name} className="rounded mb-2" />
                <h3 className="font-semibold">{c.name}</h3>
                <p className="text-sm text-textSecondary">{c.status} • {c.species}</p>
              </Link>
            ))}
          </div>

          <div className="flex items-center justify-center gap-3 mt-4">
            <button
              disabled={!info?.prev}
              onClick={() => setPage(page - 1)}
              className={`px-3 py-1 rounded border ${info?.prev ? 'hover:bg-muted' : 'opacity-50 cursor-not-allowed'}`}
            >Prev</button>
            <span className="text-sm text-textSecondary">Page {page}{info?.pages ? ` / ${info.pages}` : ''}</span>
            <button
              disabled={!info?.next}
              onClick={() => setPage(page + 1)}
              className={`px-3 py-1 rounded border ${info?.next ? 'hover:bg-muted' : 'opacity-50 cursor-not-allowed'}`}
            >Next</button>
          </div>
        </>
      )}
    </div>
  )
}
