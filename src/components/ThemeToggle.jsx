import PropTypes from 'prop-types'
import { FaRegMoon, FaRegSun } from 'react-icons/fa'

import { setTheme, useTheme } from '../utils/theme'

const ThemeToggle = ({ className = '' }) => {
  const theme = useTheme()
  const dark = theme === 'dark'

  return (
    <button
      type="button"
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      onClick={() => setTheme(dark ? 'light' : 'dark')}
      className={`theme-toggle ${className}`.trim()}
    >
      {dark ? <FaRegSun /> : <FaRegMoon />}
    </button>
  )
}

ThemeToggle.propTypes = {
  className: PropTypes.string,
}

export default ThemeToggle
