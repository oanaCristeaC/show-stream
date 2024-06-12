export class BaseRepository {
  protected readonly BASE_API_URL: string

  constructor() {
    this.BASE_API_URL = import.meta.env.API_BASE_URL || 'https://api.tvmaze.com'
  }

  protected async fetchApi(endpoint: string, options?: RequestInit): Promise<Response> {
    return await fetch(`${this.BASE_API_URL}${endpoint}`, options)
  }
}
