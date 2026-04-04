import { motion } from 'framer-motion'
import { MdEmail } from 'react-icons/md'

import { SectionWrapper } from '../hoc'
import { styles } from '../styles'
import { slideIn } from '../utils/motion'

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
          mscrivo + @gmail.com
        </span>
        <span className={`${styles.sectionSubText} flex items-center gap-2`}>
          {' '}
          or on
          <a href="https://www.linkedin.com/in/michaelscrivo/">LinkedIn</a>
        </span>
      </motion.div>
    </div>
  )
}

const WrappedContact = SectionWrapper(Contact, 'contact')
WrappedContact.displayName = 'Contact'
export default WrappedContact
