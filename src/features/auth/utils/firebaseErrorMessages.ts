export function getFirebaseErrorMessage(code: string): string {
  const messages: Record<string, string> = {
    'auth/email-already-in-use': 'Email already in use',
    'auth/invalid-credential': 'Invalid credential. Please try again',
  }

  return messages[code] ?? 'Something went wrong'
}
