export type ContentLang = 'en' | 'es'

export interface BilingualString {
  en: string
  es: string
}

export interface Author {
  name: string
  role: BilingualString
  avatarUrl: string // /portfolio_photo.jpeg now; future: bucket URL
}

export interface BlogPost {
  id: string
  slug: string
  title: BilingualString
  excerpt: BilingualString
  content: BilingualString  // Markdown per language; future: fetched from API
  coverImage: string | null // /image from public/; future: bucket URL
  author: Author
  publishedAt: string       // ISO date
  tags: string[]
  readingTimeMinutes: number
}
