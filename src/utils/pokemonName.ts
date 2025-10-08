export const formattedString = (unformattedString: string) => {
  let formatted = unformattedString.split('-')

  formatted = formatted.map((el) => el.charAt(0).toUpperCase() + el.slice(1))

  return formatted.join(' ')
}
