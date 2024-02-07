export interface SermonCardProps {
  title: string
    sermonShortDescription: string
    sermonDate: string
    sermonAudio: string
    sermonYoutubeLink: string
    sermonBookChapter: string
    sermonBookChapterTextNumber: string
    topics: string[]
    preachers: string[]
    biblebooks: string[]
    imageLinks: ImageLinks
}

export interface ImageLinks {
  full: string
  thumbnail: string
  medium: string
  large: string
}
