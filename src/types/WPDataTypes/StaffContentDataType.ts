import { WPPostSeoType } from "./CommonWPDataTypes"

export interface RenderedPastorCardDataType {
  data: TranslationFetchedData
}

export interface FetchedStaffPersonDataType {
  minister: {
    translation: TranslationFetchedData
  }
}

export interface TranslationFetchedData {
  seo: WPPostSeoType
  ministerFirstName: string
  ministerLastName: string
  ministerPosition: string
  ministerDepartment: string
  ministerDescription: string
  slug: string
  translations: Translation[]
  ministerPhoto?: MinisterPhoto[]
  imageLinks?: ImageLinks
}

export interface Schema {
  pageType: string[]
}

export interface Translation {
  slug: string
  language: Language
}

export interface Language {
  code: string
}

export interface ImageLinks {
  full?: string
  thumbnail?: string
  medium?: string
  large?: string
}

export interface MinisterPhoto {
  size: string
  url: string
}
