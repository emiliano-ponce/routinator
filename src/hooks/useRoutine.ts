import { useMemo, useState } from 'react'
import usePreferences from './usePreferences'
import useStorage from './useStorage'

interface Routine {
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
  const [_routines, setRoutines] = useStorage<Routine[]>('routines')

  const routines = useMemo(() => _routines || [], [_routines])
  const routine = useMemo(() => routines.find((r) => r.id === routineId), [routineId, routines])

  const selectRoutine = (routine: Routine) => {
    setRoutineId(routine.id)
  }

  const createRoutine = (routine: Routine) => {
    setRoutines([...routines, routine])
  }

  const deleteRoutine = (id: string) => {
    setRoutines(routines.filter((routine) => routine.id !== id))
  }

  const updateRoutine = (id: string, routine: Routine) => {
    setRoutines(routines.map((r) => (r.id === id ? routine : r)))
  }

  return {
    routine,
    routines,
    createRoutine,
    deleteRoutine,
    updateRoutine,
    selectRoutine,
  }
}

export default useRoutine
