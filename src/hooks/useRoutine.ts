import { useEffect, useMemo, useRef, useState } from 'react'
import usePreferences from './usePreferences'
import useStorage from './useStorage'

export interface IRoutine {
  id: string
  name: string
  description?: string
  activities: Activity[]
}

export type Activity = {
  id: string
  name: string
  endTime: string
  startTime: string
  description?: string
  days: [typeof Day][]
}

const Day = {
  Sun: 'Sunday',
  Mon: 'Monday',
  Tue: 'Tuesday',
  Wed: 'Wednesday',
  Thu: 'Thursday',
  Fri: 'Friday',
  Sat: 'Saturday',
} as const

const useRoutine = () => {
  const [routineId, setRoutineId] = usePreferences('routine')
  const [_routines, setRoutines] = useStorage<IRoutine[]>('routines')

  const routineRef = useRef<IRoutine | null>(null)
  const routines = useMemo(() => _routines || [], [_routines])

  useEffect(() => {
    routineRef.current = routines?.find((r) => r.id === routineId) ?? null
  }, [routineId, routines])

  const selectRoutine = (routine: IRoutine) => {
    setRoutineId(routine.id)
  }

  const createRoutine = (routine: IRoutine) => {
    setRoutines([...routines, routine])
  }

  const deleteRoutine = (id: string) => {
    setRoutines(routines.filter((routine) => routine.id !== id))
  }

  const updateRoutine = (id: string, routine: IRoutine) => {
    setRoutines(routines.map((r) => (r.id === id ? routine : r)))
  }

  return {
    routine: routineRef?.current,
    routines,
    createRoutine,
    deleteRoutine,
    updateRoutine,
    selectRoutine,
  }
}

export default useRoutine
