import { type ErrorModel, StatusCode } from '@/models/errors-model'

export class BaseRepository {
  protected readonly BASE_API_URL: string

  constructor() {
    this.BASE_API_URL = import.meta.env.API_BASE_URL || 'https://api.tvmaze.com'
  }

  protected async fetchRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
    try {
      const response = await fetch(`${this.BASE_API_URL}${endpoint}`, options)

      if (response.status === StatusCode.NOT_FOUND) {
        await Promise.reject<ErrorModel>({
          status: response.status,
          statusText: response.statusText,
          message: 'Resource not found.'
        })
      } else if (!response.ok) {
        await Promise.reject(new Error('Something went wrong while fetching data from the API.'))
      }

      return (await response.json()) as T
    } catch (error: unknown) {
      throw error
    }
  }
}
