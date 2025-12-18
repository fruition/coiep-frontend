'use client'

import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    brand: {
      50: '#e6ebf2',
      100: '#c2d0e3',
      200: '#9ab3d3',
      300: '#7296c3',
      400: '#5480b6',
      500: '#0A3161', // UW Blue
      600: '#082b57',
      700: '#06234a',
      800: '#041b3c',
      900: '#02112a',
    },
    accent: {
      50: '#f7f2ed',
      100: '#ebddd0',
      200: '#dec7b1',
      300: '#d1b192',
      400: '#c69d75',
      500: '#A67C52', // UW Brown
      600: '#8a6845',
      700: '#6e5437',
      800: '#524029',
      900: '#362c1c',
    },
    coiep: {
      blue: '#0A3161',
      brown: '#A67C52',
      lightGray: '#F2F2F2',
      darkGray: '#333333',
    },
  },
  fonts: {
    heading: 'Georgia, serif',
    body: 'Arial, sans-serif',
  },
  components: {
    Button: {
      variants: {
        solid: {
          bg: 'brand.500',
          color: 'white',
          _hover: {
            bg: 'brand.600',
          },
        },
        outline: {
          borderColor: 'brand.500',
          color: 'brand.500',
          _hover: {
            bg: 'brand.50',
          },
        },
      },
    },
  },
})

export function Providers({ children }: { children: React.ReactNode }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>
}
