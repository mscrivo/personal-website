import { motion } from 'motion/react'
import { lazy, Suspense, useEffect, useRef, useState } from 'react'

import { technologies } from '../constants'
import { SectionWrapper } from '../hoc'
import { styles } from '../styles'
import { textVariant } from '../utils/motion'

// Defer the Three.js bundle until the tech section mounts.
const BallCanvas = lazy(() => import('./canvas/Ball'))

const Tech = () => {
  const gridRef = useRef(null)
  const [inView, setInView] = useState(false)

  // Only mount the (expensive) WebGL canvases while the grid is on screen, so
  // the always-on render loops don't burn CPU when the section is out of view.
  useEffect(() => {
    const el = gridRef.current
    if (!el) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '200px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubTextLight}>My skills</p>
        <h2 className={styles.sectionHeadTextLight}>Technologies.</h2>
      </motion.div>

      <div ref={gridRef} className="flex flex-wrap justify-center gap-10 mt-14">
        {technologies.map((technology) => (
          <div className="w-28 h-28" key={technology.name}>
            {inView && (
              <Suspense fallback={null}>
                <BallCanvas name={technology.name} icon={technology.icon} />
              </Suspense>
            )}
          </div>
        ))}
      </div>
    </>
  )
}

const WrappedTech = SectionWrapper(Tech, 'tech')
WrappedTech.displayName = 'Tech'
export default WrappedTech
