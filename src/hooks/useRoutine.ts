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
  days: Day[]
}

export type Day = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday'

export const Days: { [key: string]: Day } = {
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

  // Mocking the API
  const createRoutine = async (routineReq: Omit<IRoutine, 'id'>): Promise<IRoutine> => {
    const routine = { ...routineReq, id: Math.random().toString(36).substring(2, 9) }
    setRoutines([...routines, routine])
    return new Promise((resolve) => setTimeout(() => resolve(routine), 1000))
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
