import tailwindConfig from '@ignite-ui-rcnald/react/tailwind.config'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    ...tailwindConfig.theme,
  },

  plugins: [require('tailwindcss-animate')],
}
export default config
