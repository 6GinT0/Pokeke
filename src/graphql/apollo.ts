import type { App, Plugin } from 'vue'
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable'

const createHttpLink = () =>
  new HttpLink({
    uri: 'https://graphql.pokeapi.co/v1beta2',
  })

const createApolloClient = (app: App) => {
  const cache = new InMemoryCache()
  const link = createHttpLink()

  const apolloConfig = {
    link,
    cache,
  }

  return new ApolloClient(apolloConfig)
}

const createPlugin = () => {
  const plugin: Plugin = {
    install: (app: App) => {
      const apolloClient = createApolloClient(app)

      app.provide(DefaultApolloClient, apolloClient)
    },
  }

  return plugin
}

const apolloPlugin = createPlugin()

export { apolloPlugin }
