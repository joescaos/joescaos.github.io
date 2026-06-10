import { useTranslation } from 'react-i18next'
import type { ContentLang } from '../types/blog.types'

// Returns 'es' when the UI language is Spanish, 'en' for everything else.
// Used to pick the right language field from BilingualString objects in blog posts.
export function useContentLang(): ContentLang {
  const { i18n } = useTranslation()
  return i18n.language.startsWith('es') ? 'es' : 'en'
}
