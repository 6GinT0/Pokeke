import { useApolloClient } from '@vue/apollo-composable'
import FirebaseAuthService from '@/features/auth/services/FirebaseAuthService'
import PokeAPI from '@/features/pokedex/services/PokeAPI'
import PokemonService from '@/features/pokedex/services/PokemonService'
import ShopService from '@/features/shop/services/ShopService'
import MinigameService from '@/features/minigame/services/MinigameService'

export const useServices = () => {
  const firebaseAuthService = new FirebaseAuthService()
  const { client } = useApolloClient()
  const pokeAPI = new PokeAPI(client)
  const pokemonService = new PokemonService(firebaseAuthService, pokeAPI)
  const shopService = new ShopService(firebaseAuthService, pokeAPI)
  const minigameService = new MinigameService(firebaseAuthService)

  return {
    firebaseAuthService,
    pokeAPI,
    pokemonService,
    shopService,
    minigameService,
  }
}
