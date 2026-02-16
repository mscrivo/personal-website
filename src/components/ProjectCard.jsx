import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

import { github, pineapple } from '../assets'
import { fadeIn } from '../utils/motion'


const ProjectCard = ({
  name,
  description,
  image,
  repo,
  demo,
  tags = [],
  featured = false,
  index,
}) => {
  return (
    <motion.article
      variants={fadeIn('up', 'spring', index * 0.25, 0.75)}
      className="project-card group relative overflow-hidden rounded-[24px]"
    >
      <div className="relative h-[220px] w-full overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.05]"
        />
        <div className="project-image-overlay" />
        {featured ? <span className="project-badge">Featured</span> : null}
      </div>

      <div className="flex flex-col gap-4 p-6">
        <div>
          <h3 className="text-[24px] sm:text-[28px] font-beckman uppercase text-timberWolf tracking-[1px]">
            {name}
          </h3>
          <p className="mt-2 text-silver text-[14px] leading-[22px] font-poppins">
            {description}
          </p>
        </div>

        {tags.length ? (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="project-tag">
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        <div className="flex flex-wrap items-center gap-3">
          {demo ? (
            <a
              href={demo}
              target="_blank"
              rel="noreferrer"
              className="project-link project-link-primary"
            >
              <img
                src={pineapple}
                alt="visit"
                className="w-[20px] h-[20px] object-contain"
              />
              Visit
            </a>
          ) : null}
          {repo ? (
            <a
              href={repo}
              target="_blank"
              rel="noreferrer"
              className="project-link project-link-ghost"
            >
              <img
                src={github}
                alt="source"
                className="w-[18px] h-[18px] object-contain"
              />
              Source
            </a>
          ) : null}
        </div>
      </div>
    </motion.article>
  )
}

ProjectCard.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  repo: PropTypes.string,
  demo: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  featured: PropTypes.bool,
  index: PropTypes.number.isRequired,
}

export default ProjectCard
