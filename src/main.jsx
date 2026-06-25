import { domAnimation, LazyMotion, MotionConfig } from 'motion/react'
import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MotionConfig reducedMotion="user">
      {/* LazyMotion + the `m` components load only DOM animation features
          (no layout/drag), shrinking the initial motion bundle. */}
      <LazyMotion features={domAnimation} strict>
        <App />
      </LazyMotion>
    </MotionConfig>
  </React.StrictMode>,
)
