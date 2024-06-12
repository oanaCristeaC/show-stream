import { type ShowGenresEnum, ShowStatusEnum } from '@/enums/show-enum'
import type { LanguageEnum } from '@/enums/language-enum'

export interface ShowModel {
  id: number
  url: string
  name: string
  type: string
  language: LanguageEnum
  genres: ShowGenresEnum[] | []
  status: ShowStatusEnum
  runtime: number
  averageRuntime: number
  premiered: string
  ended: string | null
  schedule: ShowScheduleModel
  rating: RatingsModel
  weight: number
  network: ShowNetworkModel
  webChannel: WebChannelModel | null
  dvdCountry: string | null
  externals: ShowExternalsModel
  image: ShowImageModel
  summary: string
  officialSite: string | null
  updated: number | null
  _links: ShowLinksModel
}

export type ShowInfo = Pick<ShowModel, 'id' | 'name' | 'type' | 'genres' | 'rating' | 'image'>

export type ShowInfoDBModel = {
  id: number
  name: string
  type: string
  genres: string
  rating: string
  image: string
}

type ShowScheduleModel = {
  time: string
  days: string[]
}

export type RatingsModel = {
  average: number | null
  votes?: number
}

type ShowNetworkModel = {
  id: number
  name: string
  code: string
  country: CountryModel
  officialSite: string
}

// todo: verify that the types are correct
type WebChannelModel = {
  id: number
  name: string
}

type ShowExternalsModel = {
  tvrage: number
  thetvdb: number
  imdb: string
}

export type ShowImageModel = {
  medium: string
  original: string
}

export type ShowLinksModel = {
  self: {
    href: string | null
  }
  previousepisode: {
    href: string | null
    name: string | null
    time?: string | null
  }
}

export interface ShowsByGenreModel {
  [genres: string]: ShowInfo[]
}
