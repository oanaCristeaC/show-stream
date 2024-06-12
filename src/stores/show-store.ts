import { defineStore } from 'pinia'
import { ShowService } from '@/api/service/show-service'
import type { ShowInfoDBModel, ShowsByGenreModel } from '@/models/show-model'
import { ShowGenresEnum } from '@/enums/show-enum'

export const useShowsInfoStore = defineStore('showsInfo', {
  state: () => ({
    showsByGenre: null as ShowsByGenreModel | null,
    showService: new ShowService(),
    hasAllShowsInfoData: false,
    allShowsInfoByGenera: [] as ShowInfoDBModel[]
  }),
  actions: {
    async getShowsByGenre(): Promise<void> {
      this.showsByGenre = await this.showService.getShowsInfoFromMemoryGroupedByGenre()
    },
    async processAllShowsInfoData(): Promise<void> {
      await this.showService.fetchRecursivelyAndProcessAllShows().then(() => {
        this.hasAllShowsInfoData = true
      })
    },
    async getAllShowsInfo(genera: ShowGenresEnum, page: number, pageSize: number): Promise<void> {
      const response = await this.showService.getAllShowsInfo(genera, page, pageSize)
      if (response !== null) {
        this.allShowsInfoByGenera = [...this.allShowsInfoByGenera, ...response]
      }
    }
  }
})
