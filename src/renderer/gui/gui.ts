export const initGui = () => {
  const navbar = makeNav()
  const navSlider = makeNavSlider()
  const main = makeMain()
  return { navbar, navSlider, main }
}

const makeNav = () => {
  const navbar = document.createElement('div')
  navbar.className = 'nav'
  document.body.appendChild(navbar)
  return navbar
}

const makeNavSlider = () => {
  const navSlider = document.createElement('div')
  return navSlider
}

const makeMain = () => {
  const main = document.createElement('div')
  main.className = 'main'
  document.body.appendChild(main)
  return main
}