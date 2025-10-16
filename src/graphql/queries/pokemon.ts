import gql from 'graphql-tag'

export const GET_POKEMONS_IDS = gql`
  query Pokemon_ids {
    pokemons: pokemon(limit: 100000, offset: 0) {
      id
    }
  }
`

export const GET_POKEMONS_COUNT = gql`
  query Pokemon_count {
    pokemon_aggregate {
      aggregate {
        count
      }
    }
  }
`

export const GET_POKEMONS = gql`
  query Pokemons($limit: Int!, $offset: Int!) {
    pokemons: pokemon(limit: $limit, offset: $offset) {
      name
      id
      images: pokemonsprites {
        sprites
      }
      stats: pokemonstats {
        base_stat
        effort
        stat {
          name
        }
      }
    }
  }
`
export const GET_POKEMON_BY_ID = gql`
  query Pokemon_by_name($id: Int!) {
    pokemon(where: { id: { _eq: $id } }) {
      name
      id
      images: pokemonsprites {
        sprites
      }
      stats: pokemonstats {
        base_stat
        effort
        stat {
          name
        }
      }
    }
  }
`
