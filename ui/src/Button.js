import React from 'react'
import { css } from 'glamor'
import colors from './palette'

const btn = css({
  display: 'block',
  fontSize: 14,
  backgroundColor: colors.darkYellow,
  transition: 'background-color 250ms ease-in-out',
  color: colors.defaultGray,
  fontWeight: 700,
  border: 0,
  paddingTop: 4,
  paddingLeft: 18,
  paddingRight: 18,
  paddingBottom: 4,
  borderRadius: 4,
  boxShadow: '0 0 4px rgba(0,0,0,.037), 0 4px 8px rgba(0,0,0,.07)',
  ':hover': {
    backgroundColor: colors.defaultYellow
  },
  '[disabled]': {
    filter: `grayscale(100%)`
  }
})

// type Props = {
//   args: Object
// }

const Button = ({ ...args }) => <button className={css(btn)} {...args} />

export default Button
