import { defineStore } from 'pinia'
import { ShowService } from '@/api/service/show-service'
import type { ShowModel } from '@/models/show-model'
import type { EpisodeModel } from '@/models/episode-model'
import type { ErrorModel } from '@/models/errors-model'
import type { ApiResponseModel } from '@/models/api-response-model'

export const useShowDetailsStore = defineStore('showDetails', {
  state: () => ({
    showService: new ShowService(),
    showDetails: {
      data: null,
      error: null,
      loading: false
    } as ApiResponseModel<ShowModel, ErrorModel>,
    showEpisodeList: {
      data: null,
      error: null,
      loading: false
    } as ApiResponseModel<EpisodeModel[], ErrorModel>
  }),
  actions: {
    async getShowInfoById(showId: number): Promise<void> {
      try {
        this.showDetails.loading = true
        this.showDetails.error = null
        this.showDetails.data = await this.showService.getShowInfoById(showId)
      } catch (error: any) {
        this.showDetails.error = error
      } finally {
        this.showDetails.loading = false
      }
    },
    async getShowEpisodeList(showId: number): Promise<void> {
      try {
        this.showEpisodeList.loading = true
        this.showEpisodeList.error = null
        this.showEpisodeList.data = await this.showService.getShowEpisodeList(showId)
      } catch (error: any) {
        this.showEpisodeList.error = error
      } finally {
        this.showEpisodeList.loading = false
      }
    }
  }
})
