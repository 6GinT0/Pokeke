import type { Pokemon } from '@/types/pokemon'

export type Pokedex = Omit<Pokemon, 'images'> &
  {
    image: string
  }[]
