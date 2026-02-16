import { motion } from 'framer-motion'
import { styles } from '../styles'
import { bwmap } from '../assets'

const Hero = () => {
  return (
    <>
      <div className="absolute top-0 left-0 z-0 h-[100vh] w-screen">
        <img
          src={bwmap}
          alt="toronto"
          className="w-full h-full sm:block hidden object-cover"
        />
      </div>
      <div className="absolute top-0 left-0 z-0 h-[100vh] w-screen">
        <img
          src={bwmap}
          alt="toronto"
          className="w-full h-full sm:hidden block object-cover"
        />
      </div>
      <section
        className="relative flex sm:flex-row flex-col w-full h-screen mx-auto 
        bg-hero bg-hero-mobile overflow-hidden"
      >
        <div className="absolute inset-0 z-10 hero-overlay pointer-events-none" />
        <div
          className={`absolute inset-0 sm:top-[250px] top-[150px] 
          lg:top-[150px] xl:top-[250px] ${styles.paddingX} 
          max-w-7xl mx-auto flex flex-col sm:flex-row items-start z-20
          justify-between gap-3`}
        >
          <div className="flex flex-col justify-center items-center mt-5 ml-3 hidden sm:flex">
            <div className="w-5 h-5 rounded-full bg-[#0a0a0a]" />
            <div className="w-1 sm:h-80 h-40 bw-gradient" />
          </div>

          <div className="hero-text-panel">
            <p className="text-[12px] sm:text-[14px] font-mova uppercase tracking-[0.35em] text-battleGray">
              Efficiency-minded Engineer
            </p>
            <h1
              className={`${styles.heroHeadText} text-eerieBlack uppercase`}
            >
              Hi, I&apos;m{' '}
              <span
                className="sm:text-battleGray sm:text-[90px] 
                text-eerieBlack text-[50px] font-mova
                font-extrabold uppercase"
              >
                Michael
              </span>
            </h1>
            <p className={`${styles.heroSubText} mt-2 text-eerieBlack`}>
              I&apos;m an experienced software engineer working in the Greater
              Toronto Area area.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="hero-cta hero-cta-primary text-[12px] sm:text-[13px]"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="hero-cta hero-cta-secondary text-[12px] sm:text-[13px]"
              >
                Get In Touch
              </a>
            </div>
          </div>
          <div
            className="hidden sm:flex w-screen items-start 
            justify-center sm:-ml-[3rem] xxs:mt-4"
          ></div>
        </div>

        <div
          className="absolute bottom-4 w-full 
          flex justify-center items-center"
        >
          <a href="#about">
            <div
              className="w-[35px] h-[64px] rounded-3xl border-4 
            border-french border-dim flex
            justify-center items-start p-2"
            >
              <motion.div
                animate={{
                  y: [0, 24, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: 'loop',
                }}
                className="w-3 h-3 rounded-full bg-taupe mb-1"
              />
            </div>
          </a>
        </div>
      </section>
    </>
  )
}

export default Hero
