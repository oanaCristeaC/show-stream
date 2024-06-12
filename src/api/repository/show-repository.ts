import type { ShowInfo, ShowInfoDBModel, ShowModel, ShowsByGenreModel } from '@/models/show-model'
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
      const response = await this.fetchApi(`/shows?page=${page}`)

      if (!response.ok) {
        return null
      }

      return await response.json()
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
  ): Promise<ShowInfoDBModel[] | null> {
    try {
      const offset = (page - 1) * pageSize

      return await this.db.showInfoDBModel
        .filter((show) => new RegExp(genre, 'i').test(show.genres))
        .offset(offset)
        .limit(pageSize)
        .toArray()
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

  public async getShowInfoById(showId: number): Promise<ShowModel | null> {
    try {
      const showDetails = await this.fetchApi(`/shows/${showId}`)
      if (!showDetails.ok) {
        return null
      }
      return await showDetails.json()
    } catch (error) {
      // log the error to a logging service: "Error fetching show info from Dexie:", error
      return null
    }
  }

  public async getShowEpisodeList(showId: number): Promise<EpisodeModel[] | null> {
    try {
      const showDetails = await this.fetchApi(`/shows/${showId}/episodes`)
      if (!showDetails.ok) {
        return null
      }
      return await showDetails.json()
    } catch (error) {
      // log the error to a logging service: "Error fetching show info from Dexie:", error
      return null
    }
  }
}
