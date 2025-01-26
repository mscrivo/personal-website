import { motion } from 'framer-motion'
import { styles } from '../styles'
import { SectionWrapper } from '../hoc'
import { slideIn } from '../utils/motion'
import { MdEmail } from 'react-icons/md'

const Contact = () => {
  return (
    <div className="-mt-[8rem] xl:flex-row flex-col-reverse flex gap-10 overflow-hidden">
      <motion.div
        variants={slideIn('left', 'tween', 0.2, 1)}
        className="flex-[0.75] bg-jet p-8 rounded-2xl"
      >
        <p className={styles.sectionHeadTextLight}>Get in touch</p>
        <span className={`${styles.sectionSubText} flex items-center gap-2`}>
          <MdEmail className="text-[24px]" />
          Contact me at: mscrivo + @gmail.com
        </span>
      </motion.div>
    </div>
  )
}

export default SectionWrapper(Contact, 'contact')
