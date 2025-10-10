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
        surface: {
          0: '{zinc.800}',
          50: '{zinc.50}',
          100: '{zinc.100}',
          200: '{zinc.200}',
          300: '{zinc.300}',
          400: '{zinc.400}',
          500: '{zinc.500}',
          600: '{zinc.600}',
          700: '{zinc.700}',
          800: '{zinc.800}',
          900: '{zinc.900}',
          950: '{zinc.950}',
          ground: '{zinc.900}',
          section: '{zinc.800}',
          card: '{zinc.800}',
          overlay: '{zinc.700}',
        },
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
    menubar: {
      root: {
        background: '{zinc.800}',
        borderColor: 'none',
      },
      colorScheme: {
        light: {
          item: {
            color: '#fafafa',
            focusColor: '#fafafa',
            focusBackground: '{zinc.700}',
          },
        },
      },
    },
    dialog: {
      root: {
        background: '{zinc.800}',
        color: '#fafafa',
        borderColor: '{zinc.600}',
      },
    },
  },
})
