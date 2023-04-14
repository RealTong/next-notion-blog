module.exports = function ({ addComponents, theme }) {
  const screens = theme('screens')
  const userStyles = theme('debugScreens.style', {})
  const ignoredScreens = theme('debugScreens.ignore', ['dark'])
  const selector = theme('debugScreens.selector', '.debug')
  const components = {
    [`${selector}::before`]: Object.assign(
      {
        position: 'fixed',
        zIndex: '50',
        width: 6,
        height: 6,
        borderRadius: '50%',
        bottom: '12px',
        right: '12px',
        padding: 12,
        fontSize: '0.75rem',
        lineHeight: '1rem',
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        content: `'xs'`,
      },
      userStyles
    ),
  }

  Object.entries(screens)
    .filter(([screen]) => !ignoredScreens.includes(screen))
    .forEach(([screen]) => {
      components[`@screen ${screen}`] = {
        [`${selector}::before`]: {
          content: `'${screen}'`,
        },
      }
    })
  addComponents(components)
}
