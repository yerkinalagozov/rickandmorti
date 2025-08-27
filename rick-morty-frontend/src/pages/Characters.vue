<template>
  <div>
    <!-- Search and Filters -->
    <div class="mb-6 bg-white p-4 rounded-lg shadow">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          v-model="filters.name"
          @input="handleSearch"
          type="text"
          placeholder="Search by name..."
          class="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        
        <select
          v-model="filters.status"
          @change="handleFilterChange"
          class="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">All Status</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
        
        <select
          v-model="filters.gender"
          @change="handleFilterChange"
          class="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">All Genders</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="genderless">Genderless</option>
          <option value="unknown">Unknown</option>
        </select>
        
        <input
          v-model="filters.species"
          @input="handleFilterChange"
          type="text"
          placeholder="Species..."
          class="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center py-8">
      <div class="text-lg">Loading characters...</div>
    </div>

    <!-- Error -->
    <div v-if="error" class="text-center py-8 text-red-600">
      <div class="text-lg">{{ error }}</div>
    </div>

    <!-- Characters Grid -->
    <div v-if="!loading && !error" class="grid grid-cols-4 gap-4">
      <div
        v-for="character in characters.slice(0, 20)"
        :key="character.id"
        class="character-card p-3 cursor-pointer"
        @click="goToCharacter(character.id)"
      >
        <img
          :src="character.image"
          :alt="character.name"
          class="w-full h-32 object-cover rounded-md mb-2"
        />
        <h3 class="text-sm font-semibold mb-1 truncate">{{ character.name }}</h3>
        <p class="text-xs text-gray-600 mb-1">
          <span :class="`status-${character.status.toLowerCase()}`">
            {{ character.status }}
          </span>
        </p>
        <p class="text-xs text-gray-500 truncate">{{ character.species }}</p>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="info && !loading" class="mt-8 flex justify-center items-center space-x-4">
      <button
        @click="loadPage(currentPage - 1)"
        :disabled="!info.prev"
        class="px-4 py-2 bg-green-600 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-green-700"
      >
        Previous
      </button>
      
      <span class="text-gray-600">
        Page {{ currentPage }} of {{ info.pages }}
      </span>
      
      <button
        @click="loadPage(currentPage + 1)"
        :disabled="!info.next"
        class="px-4 py-2 bg-green-600 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-green-700"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { rickMortyApi, type Character, type ApiResponse, type CharacterFilters } from '../api/rickMortyApi'

const router = useRouter()

const characters = ref<Character[]>([])
const info = ref<ApiResponse<Character>['info'] | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)
const currentPage = ref(1)

const filters = reactive<CharacterFilters>({
  name: '',
  status: undefined,
  gender: undefined,
  species: ''
})

let searchTimeout: NodeJS.Timeout

const loadCharacters = async (page = 1) => {
  try {
    loading.value = true
    error.value = null
    
    const cleanFilters = Object.fromEntries(
      Object.entries({ ...filters, page }).filter(([_, v]) => v !== '' && v !== undefined)
    )
    
    const response = await rickMortyApi.getCharacters(cleanFilters)
    characters.value = response.results
    info.value = response.info
    currentPage.value = page
  } catch (err) {
    error.value = 'Failed to load characters'
    characters.value = []
    info.value = null
  } finally {
    loading.value = false
  }
}

const handleSearch = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    loadCharacters(1)
  }, 500)
}

const handleFilterChange = () => {
  loadCharacters(1)
}

const loadPage = (page: number) => {
  if (page >= 1) {
    loadCharacters(page)
  }
}

const goToCharacter = (id: number) => {
  router.push(`/character/${id}`)
}

onMounted(() => {
  loadCharacters()
})
</script>