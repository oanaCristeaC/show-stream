import type { ShowInfo, ShowInfoDBModel, ShowModel } from '@/models/show-model'
import { BaseRepository } from '@/api/repository/base-repository'
import Dexie, { type EntityTable } from 'dexie'
import { db } from '@/database/indexDB'
import type { EpisodeModel } from '@/models/episode-model'
import { ShowGenresEnum } from '@/enums/show-enum'

export class ShowRepository extends BaseRepository {
  private db: Dexie & { showInfoDBModel: EntityTable<ShowInfoDBModel, 'id'> }

  constructor() {
    super()
    this.db = db
  }

  public async fetchShows(page: number): Promise<ShowModel[] | null> {
    try {
      return await this.fetchRequest(`/shows?page=${page}`)
    } catch (error) {
      // log the error to a logging service: "Error fetching shows from API:", error
      return null
    }
  }

  public async addShowInfoOnBulk(showInfoBulk: ShowInfoDBModel[] | null): Promise<void> {
    if (showInfoBulk === null) {
      return
    }
    try {
      await this.db.showInfoDBModel.bulkPut(showInfoBulk)
    } catch (error) {
      // log the error to a logging service: "Error adding show info to Dexie:", error
    }
  }

  public async getAllShowsInfoFromDb(
    genre: ShowGenresEnum,
    page: number,
    pageSize: number
  ): Promise<ShowInfo[] | null> {
    try {
      const shows = await db.showInfoDBModel.toArray()

      // Parse the JSON fields for each show
      const parsedShows = shows.map((show) => ({
        ...show,
        genres: JSON.parse(show.genres),
        image: JSON.parse(show.image),
        rating: JSON.parse(show.rating)
      }))

      const filteredShows = parsedShows.filter((show) => new RegExp(genre, 'i').test(show.genres))

      // sort the shows by rating in descending order
      filteredShows.sort((a, b) => b.rating.average - a.rating.average)

      const offset = (page - 1) * pageSize
      return filteredShows.slice(offset, offset + pageSize)
    } catch (error) {
      // log the error to a logging service: console.error('Error fetching shows by genre:', error);
      return null
    }
  }

  public async isDbDataInsertedToday(): Promise<boolean> {
    const today = new Date()

    // Set hours, minutes, seconds, and milliseconds to zero for accurate comparison
    today.setHours(0, 0, 0, 0)

    // if there are records inserted today, return true
    return this.db.showInfoDBModel
      .where('createdAt')
      .aboveOrEqual(today)
      .count()
      .then((count) => count > 0)
      .catch((error) => {
        // log the error to a logging service: "Error checking Dexie for records inserted today:", error
        return false
      })
  }

  public async getShowInfoById(showId: number): Promise<any> {
    try {
      return await this.fetchRequest(`/shows/${showId}`)
    } catch (error) {
      // log the error to a logging service: "Error fetching show info:", error
      throw error
    }
  }

  public async getShowEpisodeList(showId: number): Promise<EpisodeModel[] | null> {
    try {
      return await this.fetchRequest(`/shows/${showId}/episodes`)
    } catch (error) {
      // log the error to a logging service: "Error fetching show info from Dexie:", error
      throw error
    }
  }

  // todo: refactor this function store the genres in a separate table
  public async getAllGenres(): Promise<any> {
    try {
      const uniqueKeys = await this.db.showInfoDBModel.orderBy('genres').uniqueKeys()

      // Parse each JSON string and convert to array of strings
      const parsedArrays: string[][] = uniqueKeys.map((str) => JSON.parse(str as string))

      return [...new Set(parsedArrays.flat())]
    } catch (error) {
      // log the error to a logging service: "Error fetching genres from API:", error
      return null
    }
  }
}
