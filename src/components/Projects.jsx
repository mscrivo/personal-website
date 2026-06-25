import { motion } from 'motion/react'

import { projects } from '../constants'
import { SectionWrapper } from '../hoc'
import { styles } from '../styles'
import { fadeIn, textVariant, staggerContainer } from '../utils/motion'

import ProjectCard from './ProjectCard'

const Projects = () => {
  return (
    <div className="-mt-[2rem]">
      <motion.div variants={textVariant()}>
        <h2 className={`${styles.sectionHeadTextLight}`}>Projects</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn('', '', 0.1, 1)}
          className="mt-4 text-taupe text-[18px] max-w-3xl leading-[30px]"
        >
          Some of my side projects and open source contributions.
        </motion.p>
      </div>

      <motion.div
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className={`${styles.innerWidth} mx-auto flex flex-col`}
      >
        <div className="mt-[50px] grid grid-cols-1 gap-6 lg:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} index={index} {...project} />
          ))}
        </div>
      </motion.div>
    </div>
  )
}

const WrappedProjects = SectionWrapper(Projects, 'projects')
WrappedProjects.displayName = 'Projects'
export default WrappedProjects
