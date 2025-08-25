import axios, { AxiosError, AxiosInstance } from 'axios'
import { toast } from 'react-hot-toast'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1'

class ApiClient {
  private client: AxiosInstance
  private requestQueue: Map<string, Promise<any>> = new Map()

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 15000,
      headers: { 'Content-Type': 'application/json' },
    })

    this.setupInterceptors()
  }

  private setupInterceptors() {
    this.client.interceptors.request.use(
      (config: any) => {
        const token = localStorage.getItem('auth_token')
        if (token) config.headers.Authorization = `Bearer ${token}`

        const requestKey = `${config.method}:${config.url}:${JSON.stringify(config.params)}`
        if (this.requestQueue.has(requestKey)) {
          return this.requestQueue.get(requestKey) as any
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response) {
          switch (error.response.status) {
            case 404:
              toast.error('Requested resource not found')
              break
            case 429:
              toast.error('Too many requests. Please try again later.')
              break
            case 500:
              toast.error('Server error. Please try again later.')
              break
            default:
              toast.error('An error occurred. Please try again.')
          }
        } else if (error.request) {
          toast.error('Network error. Please check your connection.')
        }
        return Promise.reject(error)
      }
    )
  }

  get axios() { return this.client }
}

export const apiClient = new ApiClient()
