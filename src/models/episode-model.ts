import type { RatingsModel, ShowImageModel, ShowLinksModel } from '@/models/show-model'

export interface EpisodeModel {
  id: number
  url: string
  name: string
  season: number
  number: number
  type: string
  airdate: string
  airtime: string
  airstamp: string
  runtime: number
  rating: RatingsModel
  image: ShowImageModel
  summary: string
  trailer: string
  _links: ShowLinksModel
}
