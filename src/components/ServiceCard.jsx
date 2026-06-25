import { m } from 'motion/react'
import PropTypes from 'prop-types'

import { fadeIn } from '../utils/motion'

const ServiceCard = ({ index, title, icon }) => {
  return (
    <m.div
      variants={fadeIn('right', 'spring', 0.5 * index, 0.75)}
      className="xs:w-[250px] w-full card-gradient p-[1px] rounded-[20px] shadow-card"
    >
      <div className="bg-jetLight rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col">
        <img
          src={icon}
          alt={title}
          loading="lazy"
          decoding="async"
          className="w-16 h-16 object-contain"
        />
        <h3 className="text-taupe text-[18px] font-bold text-center">
          {title}
        </h3>
      </div>
    </m.div>
  )
}

ServiceCard.propTypes = {
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
}

export default ServiceCard
