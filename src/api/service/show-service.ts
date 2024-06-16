import { ShowRepository } from '@/api/repository/show-repository'
import type { ShowInfo, ShowModel, ShowsByGenreModel } from '@/models/show-model'
import { insertInSortedOrder } from '@/utilities/show-info'
import type { EpisodeModel } from '@/models/episode-model'
import { ShowGenresEnum } from '@/enums/show-enum'

export class ShowService {
  private showRepository: ShowRepository

  constructor() {
    this.showRepository = new ShowRepository()
  }

  public async getShowInfoPerPage(page: number): Promise<ShowInfo[] | null> {
    const response = await this.showRepository.fetchShows(page)

    if (response !== null) {
      return response.map((show: ShowModel) => {
        return {
          id: show.id,
          name: show.name,
          type: show.type,
          genres: show.genres,
          image: show.image,
          rating: show.rating
        }
      })
    }

    return null
  }

  /**
   * Get only partial data for the initial load
   * and keep it in memory and use it immediately since is faster
   */
  public async getRecursivelyShowsInfo() {
    let page = 0
    let showsInfo: ShowInfo[] = []
    let response = await this.getShowInfoPerPage(page)

    if (response === null) {
      return null
    }

    while (response !== null && page < 5) {
      showsInfo = showsInfo.concat(response)
      page++
      response = await this.getShowInfoPerPage(page)
    }

    return showsInfo
  }

  private getOnlyCategoriesWithMinimumShows(showsByGenre: ShowsByGenreModel, minimumShows: number) {
    const showsByGenreWithMinimumShows: ShowsByGenreModel = {}

    Object.keys(showsByGenre).forEach((genre) => {
      if (showsByGenre[genre].length >= minimumShows) {
        showsByGenreWithMinimumShows[genre] = showsByGenre[genre]
      }
    })

    return showsByGenreWithMinimumShows
  }

  /**
   * Initially use sorted data from memory
   */
  public async getShowsInfoFromMemoryGroupedByGenre(): Promise<ShowsByGenreModel | null> {
    const showsInfo = await this.getRecursivelyShowsInfo()

    if (showsInfo === null) {
      return null
    }

    const showsByGenre: { [genres: string]: ShowInfo[] } = {}

    showsInfo.forEach((show: ShowInfo) => {
      show.genres.forEach((genre: string) => {
        if (!showsByGenre[genre]) {
          showsByGenre[genre] = []
        }
        insertInSortedOrder(showsByGenre[genre], show)
        // showsByGenre[genre].push(show);
      })
    })
    return this.getOnlyCategoriesWithMinimumShows(showsByGenre, 5)
  }

  /**
   * Fetch data from the API and store it in indexedDB
   */
  public async fetchRecursivelyAndProcessAllShows() {
    const isDbDataInsertedToday = await this.showRepository.isDbDataInsertedToday()

    // Do nothing if data is inserted today
    if (isDbDataInsertedToday) {
      return
    }

    let page = 0
    let response = await this.setShowsInfo(page)

    // make api calls until there are no more pages
    while (response === true) {
      page++
      response = await this.setShowsInfo(page)
    }
  }

  public async setShowsInfo(page: number) {
    const response = await this.showRepository.fetchShows(page)

    if (response === null) {
      return false
    }

    const showInfoPage = response.map((show: ShowModel) => {
      return {
        id: show.id,
        name: show.name,
        type: show.type,
        genres: JSON.stringify(show.genres),
        rating: JSON.stringify(show.rating),
        image: JSON.stringify(show.image),
        createdAt: new Date()
      }
    })

    await this.showRepository.addShowInfoOnBulk(showInfoPage)

    return true
  }

  public async getAllShowsInfo(
    genera: ShowGenresEnum,
    page: number,
    pageSize: number
  ): Promise<ShowInfo[] | null> {
    return await this.showRepository.getAllShowsInfoFromDb(genera, page, pageSize)
  }

  public async getShowInfoById(showId: number): Promise<ShowModel | null> {
    return await this.showRepository.getShowInfoById(showId)
  }

  public async getShowEpisodeList(showId: number): Promise<EpisodeModel[] | null> {
    const data = await this.showRepository.getShowEpisodeList(showId)

    if (data !== null && data.length > 0) {
      // todo: make a utility function for sorting
      return data.sort((a, b) => {
        const dateA = a.airstamp ? new Date(a.airstamp).getTime() : 0
        const dateB = b.airstamp ? new Date(b.airstamp).getTime() : 0
        return dateB - dateA
      })
    }

    return data
  }

  public async getRemainingGenreWithShowsFromDB(loadedCategories: string[]) {
    const getAllGenres = await this.showRepository.getAllGenres()
    const loadedCategoriesToLowCase: string[] = loadedCategories.map((genre) => genre.toLowerCase())

    const remainingGenres = getAllGenres.filter(
      (genre: string) => !loadedCategoriesToLowCase.includes(genre.toLowerCase())
    )

    const showsByGenre: ShowsByGenreModel = {}

    for (const genre of remainingGenres) {
      showsByGenre[genre] = (await this.getAllShowsInfo(genre, 1, 5)) ?? []
    }

    return showsByGenre
  }
}
