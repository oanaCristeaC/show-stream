import {defineStore} from "pinia";
import {ShowService} from "@/api/service/show-service";
import type {ShowInfo} from "@/models/show-model";

export const useShowsInfoStore = defineStore('showsInfo', {
    getters: {
        getShowsInfo: async (): Promise<ShowInfo[] | null> =>  {
            const showService = new ShowService()
            return await showService.fetchRecursivelyAndProcess()
        }
    },
})