import {defineStore} from "pinia";
import {ShowService} from "@/api/service/show-service";
import type {ShowInfo, ShowsByGenreModel} from "@/models/show-model";

export const useShowsInfoStore = defineStore('showsInfo', {
    getters: {
        getShowsInfo: async (): Promise<ShowInfo[] | null> =>  {
            const showService = new ShowService()
            const showsInfo = await showService.getRecursivelyShowsInfo()

            return showsInfo // slice??
        },
        getShowsByGenre: async (): Promise<ShowsByGenreModel | null> => {
            const showService = new ShowService() // todo: refactor to use a singleton
            return await showService.getShowsInfoFromMemoryGroupedByGenre()
        }
    },
})