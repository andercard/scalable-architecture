import type { AnimeGridProps, AnimeGridEmits } from './animeGrid.types'

export const useAnimeGrid = (_props: AnimeGridProps, emit: AnimeGridEmits) => {
  const retry = () => emit('retry')
  const handlePageChange = (page: number) => emit('pageChange', page)
  return { retry, handlePageChange }
} 