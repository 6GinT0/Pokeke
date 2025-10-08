import axios from 'axios'

export const pokemonBaseUrl = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
})
