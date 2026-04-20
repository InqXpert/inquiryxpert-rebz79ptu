import { useState, useEffect } from 'react'

export function useDigitalClock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return {
    hours: time.getHours().toString().padStart(2, '0'),
    minutes: time.getMinutes().toString().padStart(2, '0'),
    seconds: time.getSeconds().toString().padStart(2, '0'),
    time,
  }
}
