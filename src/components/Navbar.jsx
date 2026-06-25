import { useEffect, useState } from 'react'

import { close, menu, logo, logotext } from '../assets'
import { navLinks } from '../constants'
import { styles } from '../styles'

const Navbar = () => {
  const [active, setActive] = useState('')
  const [toggle, setToggle] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Highlight the nav item for whichever section is currently in view. The
  // section anchors carry the ids set by SectionWrapper's hash-span.
  useEffect(() => {
    const sections = navLinks
      .map((nav) => document.getElementById(nav.id))
      .filter(Boolean)
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (!visible) return
        const nav = navLinks.find((item) => item.id === visible.target.id)
        if (nav) setActive(nav.title)
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.5, 1] },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center py-2 fixed
      top-0 z-50 sm:opacity-[0.97] nav-shell ${scrolled ? 'nav-scrolled' : ''}`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <a
          href="/"
          className="flex items-center gap-2"
          onClick={(e) => {
            e.preventDefault()
            setActive('')
            window.scrollTo(0, 0)
          }}
        >
          <img
            src={logo}
            alt="Michael Scrivo logo"
            className="sm:w-[50px] sm:h-[50px] w-[38px] h-[38px] object-contain"
          />
          <img
            src={logotext}
            alt=""
            className="sm:w-[90px] sm:h-[90px] w-[64px] h-[64px] -ml-[0.6rem] object-contain"
          />
        </a>
        <ul className="list-none hidden sm:flex flex-row gap-10 mt-2">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.title ? 'nav-link-active' : 'text-eerieBlack'
              } hover:text-taupe text-[21px] font-medium font-mova 
                uppercase tracking-[3px] cursor-pointer nav-links nav-link`}
            >
              <a href={`#${nav.id}`} onClick={() => setActive(nav.title)}>
                {nav.title}
              </a>
            </li>
          ))}
        </ul>

        {/* mobile */}
        <div className="sm:hidden flex flex-1 w-screen justify-end items-center">
          {toggle ? (
            <div
              className={`p-6 bg-flashWhite fixed 
                inset-0 w-screen h-[100svh] z-[80] menu ${
                  toggle ? 'menu-open' : 'menu-close'
                }`}
            >
              <div className="flex justify-end">
                <button
                  type="button"
                  aria-label="Close menu"
                  className="w-[22px] h-[22px]"
                  onClick={() => setToggle(!toggle)}
                >
                  <img
                    src={close}
                    alt=""
                    className="w-[22px] h-[22px] object-contain"
                  />
                </button>
              </div>
              <ul
                className="list-none flex flex-col gap-6 
                items-start justify-start mt-[5rem] max-h-[70vh] overflow-y-auto"
              >
                {navLinks.map((nav) => (
                  <li
                    key={nav.id}
                    className={`${
                      active === nav.title ? 'text-french' : 'text-eerieBlack'
                    } text-[48px] font-medium font-mova
                      uppercase tracking-[1px] cursor-pointer`}
                  >
                    <a
                      href={`#${nav.id}`}
                      onClick={() => {
                        setToggle(!toggle)
                        setActive(nav.title)
                      }}
                    >
                      {nav.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <button
              type="button"
              aria-label="Open menu"
              className="w-[34px] h-[34px]"
              onClick={() => setToggle(!toggle)}
            >
              <img
                src={menu}
                alt=""
                className="w-[34px] h-[34px] object-contain"
              />
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
