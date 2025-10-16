export interface Root {
  data: Data
}

export interface Data {
  pokemon: Pokemon[]
}

export interface Pokemon {
  name: string
  id: number
  images: Image[]
  stats: Stat[]
}

export interface Image {
  sprites: Sprites
}

export interface Sprites {
  other: Other
  versions: Versions
  back_shiny: string
  back_female: string | null
  front_shiny: string
  back_default: string
  front_female: string | null
  front_default: string
  back_shiny_female: string | null
  front_shiny_female: string | null
}

export interface Other {
  home: Home
  showdown: Showdown
  dream_world: DreamWorld
  'official-artwork': OfficialArtwork
}

export interface Home {
  front_shiny: string
  front_female: string | null
  front_default: string
  front_shiny_female: string | null
}

export interface Showdown {
  back_shiny: string
  back_female: string | null
  front_shiny: string
  back_default: string
  front_female: string | null
  front_default: string
  back_shiny_female: string | null
  front_shiny_female: string | null
}

export interface DreamWorld {
  front_female: string | null
  front_default: string
}

export interface OfficialArtwork {
  front_shiny: string
  front_default: string
}

export interface Versions {
  'generation-i': GenerationI
  'generation-v': GenerationV
  'generation-ii': GenerationIi
  'generation-iv': GenerationIv
  'generation-vi': GenerationVi
  'generation-iii': GenerationIii
  'generation-vii': GenerationVii
  'generation-viii': GenerationViii
}

export interface GenerationI {
  yellow: Yellow
  'red-blue': RedBlue
}

export interface Yellow {
  back_gray: string
  front_gray: string
  back_default: string
  front_default: string
  back_transparent: string
  front_transparent: string
}

export interface RedBlue {
  back_gray: string
  front_gray: string
  back_default: string
  front_default: string
  back_transparent: string
  front_transparent: string
}

export interface GenerationV {
  'black-white': BlackWhite
}

export interface BlackWhite {
  animated: Animated
  back_shiny: string
  back_female: string | null
  front_shiny: string
  back_default: string
  front_female: string | null
  front_default: string
  back_shiny_female: string | null
  front_shiny_female: string | null
}

export interface Animated {
  back_shiny: string
  back_female: string | null
  front_shiny: string
  back_default: string
  front_female: string | null
  front_default: string
  back_shiny_female: string | null
  front_shiny_female: string | null
}

export interface GenerationIi {
  gold: Gold
  silver: Silver
  crystal: Crystal
}

export interface Gold {
  back_shiny: string
  front_shiny: string
  back_default: string
  front_default: string
  front_transparent: string
}

export interface Silver {
  back_shiny: string
  front_shiny: string
  back_default: string
  front_default: string
  front_transparent: string
}

export interface Crystal {
  back_shiny: string
  front_shiny: string
  back_default: string
  front_default: string
  back_transparent: string
  front_transparent: string
  back_shiny_transparent: string
  front_shiny_transparent: string
}

export interface GenerationIv {
  platinum: Platinum
  'diamond-pearl': DiamondPearl
  'heartgold-soulsilver': HeartgoldSoulsilver
}

export interface Platinum {
  back_shiny: string
  back_female: string | null
  front_shiny: string
  back_default: string
  front_female: string | null
  front_default: string
  back_shiny_female: string | null
  front_shiny_female: string | null
}

export interface DiamondPearl {
  back_shiny: string
  back_female: string | null
  front_shiny: string
  back_default: string
  front_female: string | null
  front_default: string
  back_shiny_female: string | null
  front_shiny_female: string | null
}

export interface HeartgoldSoulsilver {
  back_shiny: string
  back_female: string | null
  front_shiny: string
  back_default: string
  front_female: string | null
  front_default: string
  back_shiny_female: string | null
  front_shiny_female: string | null
}

export interface GenerationVi {
  'x-y': XY
  'omegaruby-alphasapphire': OmegarubyAlphasapphire
}

export interface XY {
  front_shiny: string
  front_female: string | null
  front_default: string
  front_shiny_female: string | null
}

export interface OmegarubyAlphasapphire {
  front_shiny: string
  front_female: string | null
  front_default: string
  front_shiny_female: string | null
}

export interface GenerationIii {
  emerald: Emerald
  'ruby-sapphire': RubySapphire
  'firered-leafgreen': FireredLeafgreen
}

export interface Emerald {
  front_shiny: string
  front_default: string
}

export interface RubySapphire {
  back_shiny: string
  front_shiny: string
  back_default: string
  front_default: string
}

export interface FireredLeafgreen {
  back_shiny: string
  front_shiny: string
  back_default: string
  front_default: string
}

export interface GenerationVii {
  icons: Icons
  'ultra-sun-ultra-moon': UltraSunUltraMoon
}

export interface Icons {
  front_female: string | null
  front_default: string
}

export interface UltraSunUltraMoon {
  front_shiny: string
  front_female: string | null
  front_default: string
  front_shiny_female: string | null
}

export interface GenerationViii {
  icons: Icons2
}

export interface Icons2 {
  front_female: string | null
  front_default: string
}

export interface Stat {
  base_stat: number
  effort: number
  stat: Stat2
}

export interface Stat2 {
  name: string
}

export interface PokemonParsedData {
  id: number
  name: string
  image: string
  stats: Stat[]
}
