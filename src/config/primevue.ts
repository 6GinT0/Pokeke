import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'

export const CustomPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{indigo.50}',
      100: '{indigo.100}',
      200: '{indigo.200}',
      300: '{indigo.300}',
      400: '{indigo.400}',
      500: '{indigo.500}',
      600: '{indigo.600}',
      700: '{indigo.700}',
      800: '{indigo.800}',
      900: '{indigo.900}',
      950: '{indigo.950}',
    },
    colorScheme: {
      light: {
        formField: {
          background: '{zinc.700}',
          borderColor: '{zinc.600}',
          hoverBorderColor: '{primary.color}',
          color: 'white',
        },
      },
    },
  },
  components: {
    card: {
      root: {
        background: '{zinc.800}',
        color: '#fafafa',
      },
      subtitle: {
        color: '{surface.300}',
      },
    },
    button: {
      colorScheme: {
        light: {
          outlined: {
            primary: {
              borderColor: '{zinc.600}',
              activeBackground: '{zinc.600}',
              hoverBackground: '{zinc.600}',
              color: 'white',
            },
          },
        },
      },
    },
  },
})
