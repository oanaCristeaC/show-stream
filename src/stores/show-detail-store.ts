import { defineStore } from 'pinia'
import { ShowService } from '@/api/service/show-service'
import type { ShowModel } from '@/models/show-model'
import type { EpisodeModel } from '@/models/episode-model'

export const useShowDetailsStore = defineStore('showDetails', {
  state: () => ({
    showService: new ShowService(),
    showDetails: null as ShowModel | null,
    showEpisodeList: null as EpisodeModel[] | null
  }),
  actions: {
    async getShowInfoById(showId: number): Promise<void> {
      this.showDetails = await this.showService.getShowInfoById(showId)
    },
    async getShowEpisodeList(showId: number): Promise<void> {
      this.showEpisodeList = await this.showService.getShowEpisodeList(showId)
    }
  }
})
