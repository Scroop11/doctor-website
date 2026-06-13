import { useState, useEffect } from 'react'

export const useCounterAnimation = (end, isVisible, duration = 2000, start = 0) => {
  const [count, setCount] = useState(start)
  const [hasRun, setHasRun] = useState(false)

  useEffect(() => {
    if (!isVisible || hasRun) return

    let startTimestamp = null
    const endValue = typeof end === 'string' ? parseInt(end.replace(/\D/g, '')) : end

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)
      const currentCount = Math.floor(progress * (endValue - start) + start)
      
      setCount(currentCount)

      if (progress < 1) {
        window.requestAnimationFrame(step)
      } else {
        setHasRun(true)
      }
    }

    window.requestAnimationFrame(step)
  }, [end, isVisible, duration, start, hasRun])

  return count
}
