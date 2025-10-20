import 'dotenv/config'
import { defineConfig } from 'cypress'
import admin from 'firebase-admin'
import { plugin as cypressFirebasePlugin } from 'cypress-firebase'
import serviceAccountKey from './serviceAccountKey.json'

export default defineConfig({
  env: {
    TESTING_BASE_URL: process.env.TESTING_BASE_URL,
    FIREBASE_API_KEY: process.env.VITE_FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.VITE_FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID: process.env.VITE_FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET: process.env.VITE_FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID: process.env.VITE_FIREBASE_APP_ID,
  },
  e2e: {
    baseUrl: process.env.TESTING_BASE_URL || 'http://localhost:5173/',
    setupNodeEvents(on, config) {
      on('task', {
        async deleteTestUser({ email }) {
          const user = await admin
            .auth()
            .getUserByEmail(email)
            .catch(() => null)
          if (user) {
            await admin.firestore().doc(`users/${user.uid}`).delete()
            await admin.auth().deleteUser(user.uid)
          }
          return null
        },
      })

      return cypressFirebasePlugin(on, config, admin, {
        credential: admin.credential.cert(serviceAccountKey),
        projectId: process.env.VITE_FIREBASE_PROJECT_ID,
      })
    },
  },
})
