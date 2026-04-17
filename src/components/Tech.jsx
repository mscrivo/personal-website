import { motion } from 'motion/react'

import { technologies } from '../constants'
import { SectionWrapper } from '../hoc'
import { styles } from '../styles'
import { textVariant } from '../utils/motion'

import { BallCanvas } from './canvas'

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
            <BallCanvas name={technology.name} icon={technology.icon} />
          </div>
        ))}
      </div>
    </>
  )
}

const WrappedTech = SectionWrapper(Tech, 'tech')
WrappedTech.displayName = 'Tech'
export default WrappedTech
