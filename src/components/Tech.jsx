import { m } from 'motion/react'
import { createRef, lazy, Suspense, useEffect, useRef, useState } from 'react'

import { technologies } from '../constants'
import { SectionWrapper } from '../hoc'
import { styles } from '../styles'
import { textVariant } from '../utils/motion'

// Defer the WebGL (OGL) bundle until the tech section is near the viewport.
const TechBalls = lazy(() => import('./canvas/TechBallsOGL'))

const Tech = () => {
  const gridRef = useRef(null)
  // Stable ref per grid cell; the single canvas scissors a ball to each one.
  const [cellRefs] = useState(() => technologies.map(() => createRef()))
  const [inView, setInView] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState(null)

  // Only mount the WebGL canvas while the grid is on screen.
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
    <div>
      <m.div variants={textVariant()}>
        <p className={styles.sectionSubTextLight}>My skills</p>
        <h2 className={styles.sectionHeadTextLight}>Technologies.</h2>
      </m.div>

      <div
        ref={gridRef}
        className="relative flex flex-wrap justify-center gap-10 mt-14"
      >
        {technologies.map((technology, index) => (
          <div
            key={technology.name}
            ref={cellRefs[index]}
            className="relative w-28 h-28"
            onPointerEnter={() => setHoveredIndex(index)}
            onPointerLeave={() => setHoveredIndex(null)}
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
          <TechBalls
            technologies={technologies}
            cellRefs={cellRefs}
            containerRef={gridRef}
            hoveredIndex={hoveredIndex}
          />
        </Suspense>
      )}
    </div>
  )
}

const WrappedTech = SectionWrapper(Tech, 'tech')
WrappedTech.displayName = 'Tech'
export default WrappedTech
