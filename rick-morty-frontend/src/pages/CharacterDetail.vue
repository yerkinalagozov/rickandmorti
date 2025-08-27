<template>
  <div>
    <!-- Back Button -->
    <button
      @click="goBack"
      class="mb-6 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
    >
      ← Back to Characters
    </button>

    <!-- Loading -->
    <div v-if="loading" class="text-center py-8">
      <div class="text-lg">Loading character...</div>
    </div>

    <!-- Error -->
    <div v-if="error" class="text-center py-8 text-red-600">
      <div class="text-lg">{{ error }}</div>
    </div>

    <!-- Character Detail -->
    <div v-if="character && !loading" class="bg-white rounded-lg shadow-lg overflow-hidden">
      <div class="md:flex">
        <!-- Character Image -->
        <div class="md:w-1/3">
          <img
            :src="character.image"
            :alt="character.name"
            class="w-full h-64 md:h-full object-cover"
          />
        </div>
        
        <!-- Character Info -->
        <div class="md:w-2/3 p-6">
          <h1 class="text-3xl font-bold mb-4">{{ character.name }}</h1>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 class="text-lg font-semibold mb-2">Basic Info</h3>
              <div class="space-y-2">
                <p>
                  <span class="font-medium">Status:</span>
                  <span :class="`ml-2 status-${character.status.toLowerCase()}`">
                    {{ character.status }}
                  </span>
                </p>
                <p>
                  <span class="font-medium">Species:</span>
                  <span class="ml-2">{{ character.species }}</span>
                </p>
                <p v-if="character.type">
                  <span class="font-medium">Type:</span>
                  <span class="ml-2">{{ character.type }}</span>
                </p>
                <p>
                  <span class="font-medium">Gender:</span>
                  <span class="ml-2">{{ character.gender }}</span>
                </p>
              </div>
            </div>
            
            <div>
              <h3 class="text-lg font-semibold mb-2">Additional Info</h3>
              <div class="space-y-2">
                <p>
                  <span class="font-medium">Episodes:</span>
                  <span class="ml-2">{{ character.episode.length }}</span>
                </p>
                <p>
                  <span class="font-medium">Created:</span>
                  <span class="ml-2">{{ formatDate(character.created) }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { rickMortyApi, type Character } from '../api/rickMortyApi'

const router = useRouter()
const route = useRoute()

const character = ref<Character | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

const props = defineProps<{
  id: string
}>()

const loadCharacter = async () => {
  try {
    loading.value = true
    error.value = null
    
    const characterId = parseInt(props.id)
    if (isNaN(characterId)) {
      error.value = 'Invalid character ID'
      return
    }
    
    const response = await rickMortyApi.getCharacter(characterId)
    character.value = response
  } catch (err) {
    error.value = 'Failed to load character'
    character.value = null
  } finally {
    loading.value = false
  }
}

const goBack = () => {
  router.push('/')
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}

onMounted(() => {
  loadCharacter()
})
</script>