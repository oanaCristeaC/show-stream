import {defineStore} from "pinia";
import {ShowService} from "@/api/service/show-service";
import type { ShowsByGenreModel} from "@/models/show-model";


export const useShowsInfoStore = defineStore('showsInfo', {
    state: () => ({
        showsByGenre: null as ShowsByGenreModel | null,
        showService: new ShowService()
    }),
    actions: {

        async getShowsByGenre(): Promise<void>  {
            this.showsByGenre = await this.showService.getShowsInfoFromMemoryGroupedByGenre()
        },
    },
})