import { motion } from 'motion/react'
import { FaLinkedin } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { SiBluesky, SiKeybase } from 'react-icons/si'

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
          mscrivo [at] gmail [dot] com
        </span>
        <span className={`${styles.sectionSubText} flex items-center gap-2`}>
          <FaLinkedin className="text-[24px]" />
          <a href="https://www.linkedin.com/in/michaelscrivo/">LinkedIn</a>
        </span>
        <span className={`${styles.sectionSubText} flex items-center gap-2`}>
          <SiKeybase className="text-[24px]" />
          <a href="https://keybase.io/mscrivo">Keybase</a>
        </span>
        <span className={`${styles.sectionSubText} flex items-center gap-2`}>
          <SiBluesky className="text-[24px]" />
          <a
            href="https://bsky.app/profile/michaelscrivo.com"
            className="font-sans"
          >
            @michaelscrivo.com
          </a>
        </span>
      </motion.div>
    </div>
  )
}

const WrappedContact = SectionWrapper(Contact, 'contact')
WrappedContact.displayName = 'Contact'
export default WrappedContact
