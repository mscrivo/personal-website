import { m } from 'motion/react'
import { useEffect, useMemo, useState } from 'react'

import { bwmap } from '../assets'
import { styles } from '../styles'
import { useTheme } from '../utils/theme'

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

const hexToRgba = (hex, alpha) => {
  const parsed = hex.replace('#', '')
  const normalized =
    parsed.length === 3
      ? parsed
          .split('')
          .map((char) => `${char}${char}`)
          .join('')
      : parsed

  const numeric = Number.parseInt(normalized, 16)
  const r = (numeric >> 16) & 255
  const g = (numeric >> 8) & 255
  const b = numeric & 255

  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

// Each mood carries a `dark` palette used when the dark theme is active. In
// dark mode `deep` doubles as the bright accent for the name, mirroring how it
// reads as a dark accent on the light hero.
const getMoodByHour = (hour) => {
  if (hour >= 5 && hour < 10) {
    return {
      label: 'Dawn',
      base: '#f9efe5',
      mid: '#e8d5bf',
      deep: '#2a3a52',
      glowSoft: 'rgba(255, 232, 198, 0.8)',
      glowStrong: 'rgba(61, 87, 117, 0.62)',
      pulse: '#dca56a',
      dark: {
        base: '#4a3d31',
        mid: '#3f3a35',
        deep: '#e6c9a3',
        glowSoft: 'rgba(220, 165, 106, 0.2)',
        glowStrong: 'rgba(8, 10, 14, 0.75)',
        pulse: '#dca56a',
      },
    }
  }

  if (hour >= 10 && hour < 17) {
    return {
      label: 'Day',
      base: '#f6f6f8',
      mid: '#dde8f0',
      deep: '#243744',
      glowSoft: 'rgba(245, 250, 255, 0.88)',
      glowStrong: 'rgba(53, 84, 106, 0.58)',
      pulse: '#7db3d5',
      dark: {
        base: '#39424c',
        mid: '#333c46',
        deep: '#bcd8ee',
        glowSoft: 'rgba(125, 179, 213, 0.18)',
        glowStrong: 'rgba(6, 9, 13, 0.75)',
        pulse: '#7db3d5',
      },
    }
  }

  if (hour >= 17 && hour < 20) {
    return {
      label: 'Sunset',
      base: '#f7e6d7',
      mid: '#dea783',
      deep: '#2f2445',
      glowSoft: 'rgba(255, 214, 177, 0.88)',
      glowStrong: 'rgba(77, 61, 108, 0.63)',
      pulse: '#ec8d67',
      dark: {
        base: '#4a3a33',
        mid: '#463538',
        deep: '#f0b18d',
        glowSoft: 'rgba(236, 141, 103, 0.2)',
        glowStrong: 'rgba(9, 7, 12, 0.75)',
        pulse: '#ec8d67',
      },
    }
  }

  return {
    label: 'Night',
    base: '#d9dce4',
    mid: '#7f8ea6',
    deep: '#121926',
    glowSoft: 'rgba(197, 213, 255, 0.72)',
    glowStrong: 'rgba(18, 31, 53, 0.66)',
    pulse: '#9db6ff',
    dark: {
      base: '#2c3140',
      mid: '#2a2f3d',
      deep: '#9db6ff',
      glowSoft: 'rgba(157, 182, 255, 0.18)',
      glowStrong: 'rgba(5, 7, 12, 0.78)',
      pulse: '#9db6ff',
    },
  }
}

const moodPreviewHours = {
  Dawn: 7,
  Day: 13,
  Sunset: 18,
  Night: 22,
}

const Hero = () => {
  const theme = useTheme()
  const dark = theme === 'dark'
  const [currentHour, setCurrentHour] = useState(() => new Date().getHours())
  const [scrollProgress, setScrollProgress] = useState(0)
  const [moodOverride, setMoodOverride] = useState(null)

  useEffect(() => {
    if (moodOverride !== null) {
      return
    }

    const timer = window.setInterval(() => {
      setCurrentHour(new Date().getHours())
    }, 60000)

    return () => {
      window.clearInterval(timer)
    }
  }, [moodOverride])

  const mood = useMemo(() => {
    const base = getMoodByHour(moodOverride ?? currentHour)
    return dark ? { ...base, ...base.dark } : base
  }, [moodOverride, currentHour, dark])

  useEffect(() => {
    const handleScroll = () => {
      const nextProgress = clamp(window.scrollY / window.innerHeight, 0, 1)
      setScrollProgress(nextProgress)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const splitPoint = useMemo(() => 62 - scrollProgress * 10, [scrollProgress])
  const overlayOpacity = useMemo(
    () => 0.78 + scrollProgress * 0.16,
    [scrollProgress],
  )

  const sectionStyle = useMemo(
    () => ({
      backgroundImage: `linear-gradient(132deg, ${hexToRgba(mood.base, 0.62)} 0%, ${hexToRgba(mood.mid, 0.54)} ${splitPoint}%, ${hexToRgba(mood.deep, 0.8)} 100%)`,
      transition: 'background-image 700ms ease',
    }),
    [mood, splitPoint],
  )

  const overlayStyle = useMemo(
    () => ({
      background: `radial-gradient(1100px 520px at 12% 18%, ${mood.glowSoft} 0%, rgba(244, 244, 246, 0) 65%), radial-gradient(900px 520px at 78% 55%, ${mood.glowStrong} 0%, rgba(10, 10, 10, 0) 60%)`,
      opacity: overlayOpacity,
      transition: 'background 700ms ease, opacity 250ms ease',
    }),
    [mood, overlayOpacity],
  )

  return (
    <>
      <div className="absolute top-0 left-0 z-0 h-[100vh] w-screen">
        <img
          src={bwmap}
          alt="Map of Toronto"
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover"
        />
      </div>
      <section
        className="relative flex sm:flex-row flex-col w-full h-screen mx-auto
        bg-hero bg-hero-mobile overflow-hidden"
        style={sectionStyle}
      >
        <div
          className="absolute inset-0 z-10 hero-overlay pointer-events-none"
          style={overlayStyle}
        />
        <div
          className="mood-orb mood-orb-a"
          style={{
            background: mood.pulse,
            transform: `translateY(${scrollProgress * -20}px)`,
          }}
        />
        <div
          className="mood-orb mood-orb-b"
          style={{
            background: mood.pulse,
            transform: `translateY(${scrollProgress * 16}px)`,
          }}
        />
        <div
          className={`absolute inset-0 sm:top-[250px] top-[130px] 
          lg:top-[150px] xl:top-[250px] ${styles.paddingX} 
          max-w-7xl mx-auto flex flex-col sm:flex-row items-start z-20
          justify-between gap-3`}
        >
          <div className="flex flex-col justify-center items-center mt-5 ml-3 hidden sm:flex">
            <div className="w-5 h-5 rounded-full bg-[#0a0a0a]" />
            <div className="w-1 sm:h-80 h-40 bw-gradient" />
          </div>

          <div className="hero-text-panel">
            {import.meta.env.DEV ? (
              <div
                className="dev-mood-switcher"
                role="group"
                aria-label="Mood tester"
              >
                <span className="dev-mood-label">Mood Tester</span>
                {Object.entries(moodPreviewHours).map(([label, hour]) => {
                  const isActive = mood.label === label

                  return (
                    <button
                      key={label}
                      type="button"
                      onClick={() => setMoodOverride(hour)}
                      className={`dev-mood-btn ${isActive ? 'is-active' : ''}`}
                    >
                      {label}
                    </button>
                  )
                })}
                <button
                  type="button"
                  onClick={() => {
                    setCurrentHour(new Date().getHours())
                    setMoodOverride(null)
                  }}
                  className={`dev-mood-btn ${
                    moodOverride === null ? 'is-active' : ''
                  }`}
                >
                  Auto
                </button>
              </div>
            ) : null}
            <p className="text-[12px] sm:text-[14px] font-mova uppercase tracking-[0.35em] text-battleGray">
              Efficiency-minded Engineer
            </p>
            <h1
              className={`${styles.heroHeadText} ${
                dark ? 'text-flashWhite' : 'text-eerieBlack'
              } uppercase`}
            >
              Hi, I&apos;m{' '}
              <span
                className="sm:text-[90px] text-[50px] font-mova
                font-extrabold uppercase"
                style={{ color: mood.deep }}
              >
                Michael
              </span>
            </h1>
            <p
              className={`${styles.heroSubText} mt-2 ${
                dark ? 'text-timberWolf' : 'text-eerieBlack'
              }`}
            >
              I&apos;m an experienced software engineer working in the Greater
              Toronto Area.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="hero-cta hero-cta-primary text-[12px] sm:text-[13px]"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="hero-cta hero-cta-secondary text-[12px] sm:text-[13px]"
              >
                Get In Touch
              </a>
            </div>
          </div>
          <div
            className="hidden sm:flex w-screen items-start 
            justify-center sm:-ml-[3rem] xxs:mt-4"
          ></div>
        </div>

        <div
          className="absolute bottom-4 w-full
          hidden sm:flex justify-center items-center"
        >
          <a href="#about">
            <div
              className="w-[35px] h-[64px] rounded-3xl border-4 
            border-french border-dim flex
            justify-center items-start p-2"
            >
              <m.div
                animate={{
                  y: [0, 24, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: 'loop',
                }}
                className="w-3 h-3 rounded-full bg-taupe mb-1"
              />
            </div>
          </a>
        </div>
      </section>
    </>
  )
}

export default Hero
