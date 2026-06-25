import { m } from 'motion/react'
import { FaLinkedin } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { SiBluesky, SiKeybase } from 'react-icons/si'

import { SectionWrapper } from '../hoc'
import { styles } from '../styles'
import { slideIn } from '../utils/motion'

const Contact = () => {
  return (
    <div className="-mt-[8rem] flex flex-col items-center justify-center gap-10 overflow-hidden">
      <m.div
        variants={slideIn('left', 'tween', 0.2, 1)}
        className="w-full max-w-2xl bg-jet p-8 rounded-2xl space-y-4"
      >
        <p className={styles.sectionHeadTextLight}>Get in touch</p>
        <span className={`${styles.sectionSubText} flex items-center gap-2`}>
          <MdEmail className="text-[24px]" />
          mscrivo [at] gmail [dot] com
        </span>
        <span className={`${styles.sectionSubText} flex items-center gap-2`}>
          <FaLinkedin className="text-[24px]" />
          <a
            href="https://www.linkedin.com/in/michaelscrivo/"
            target="_blank"
            rel="noreferrer"
            className="link-bright"
          >
            LinkedIn
          </a>
        </span>
        <span className={`${styles.sectionSubText} flex items-center gap-2`}>
          <SiKeybase className="text-[24px]" />
          <a
            href="https://keybase.io/mscrivo"
            target="_blank"
            rel="noreferrer"
            className="link-bright"
          >
            Keybase
          </a>
        </span>
        <span className={`${styles.sectionSubText} flex items-center gap-2`}>
          <SiBluesky className="text-[24px]" />
          <a
            href="https://bsky.app/profile/michaelscrivo.com"
            target="_blank"
            rel="noreferrer"
            className="font-sans link-bright"
          >
            @michaelscrivo.com
          </a>
        </span>
      </m.div>
    </div>
  )
}

const WrappedContact = SectionWrapper(Contact, 'contact')
WrappedContact.displayName = 'Contact'
export default WrappedContact
