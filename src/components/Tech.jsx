import { motion } from 'motion/react'
import { lazy, Suspense } from 'react'

import { technologies } from '../constants'
import { SectionWrapper } from '../hoc'
import { styles } from '../styles'
import { textVariant } from '../utils/motion'

// Defer the Three.js bundle until the tech section mounts.
const BallCanvas = lazy(() => import('./canvas/Ball'))

const Tech = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubTextLight}>My skills</p>
        <h2 className={styles.sectionHeadTextLight}>Technologies.</h2>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-10 mt-14">
        {technologies.map((technology) => (
          <div className="w-28 h-28" key={technology.name}>
            <Suspense fallback={null}>
              <BallCanvas name={technology.name} icon={technology.icon} />
            </Suspense>
          </div>
        ))}
      </div>
    </>
  )
}

const WrappedTech = SectionWrapper(Tech, 'tech')
WrappedTech.displayName = 'Tech'
export default WrappedTech
