import { motion } from 'motion/react'
import { createRef, lazy, Suspense, useEffect, useRef, useState } from 'react'

import { technologies } from '../constants'
import { SectionWrapper } from '../hoc'
import { styles } from '../styles'
import { textVariant } from '../utils/motion'

// Defer the Three.js bundle until the tech section mounts.
const BallCanvas = lazy(() => import('./canvas/Ball'))

const Tech = () => {
  const containerRef = useRef(null)
  const gridRef = useRef(null)
  // Stable ref per grid cell; the single canvas scissors a <View> to each one.
  const [cellRefs] = useState(() => technologies.map(() => createRef()))
  const [inView, setInView] = useState(false)
  // Index of the ball currently hovered; drives the DOM tooltip below. The
  // tooltip lives in the DOM (not a drei <Html>) because <Html> positions
  // against the full canvas, not the View's scissor, so it lands way off.
  const [hoveredIndex, setHoveredIndex] = useState(null)

  // Only mount the (expensive) WebGL canvas while the grid is on screen, so the
  // always-on render loop doesn't burn CPU when the section is out of view.
  useEffect(() => {
    const el = gridRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '200px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef}>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubTextLight}>My skills</p>
        <h2 className={styles.sectionHeadTextLight}>Technologies.</h2>
      </motion.div>

      <div ref={gridRef} className="flex flex-wrap justify-center gap-10 mt-14">
        {technologies.map((technology, index) => (
          <div
            className="relative w-28 h-28"
            key={technology.name}
            ref={cellRefs[index]}
          >
            {hoveredIndex === index && (
              <div className="absolute left-1/2 -top-2 z-10 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded bg-black/75 p-2 text-white pointer-events-none">
                {technology.name}
              </div>
            )}
          </div>
        ))}
      </div>

      {inView && (
        <Suspense fallback={null}>
          <BallCanvas
            technologies={technologies}
            cellRefs={cellRefs}
            eventSource={containerRef}
            onHover={setHoveredIndex}
          />
        </Suspense>
      )}
    </div>
  )
}

const WrappedTech = SectionWrapper(Tech, 'tech')
WrappedTech.displayName = 'Tech'
export default WrappedTech
