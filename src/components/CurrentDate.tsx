import React, { useState, useEffect } from 'react'
import { IonLabel } from '@ionic/react'

const CurrentDate = () => {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(intervalId)
  }, [])

  return <IonLabel>{currentTime.toLocaleString()}</IonLabel>
}

export default CurrentDate
