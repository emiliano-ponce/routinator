import { IonItem, IonList } from '@ionic/react'
import React from 'react'
import useRoutine from '../hooks/useRoutine'

export interface RoutineViewProps {}

export default function RoutineView(props: RoutineViewProps) {
  const { routine, routines, selectRoutine } = useRoutine()
  const hasRoutines = routines.length > 0

  return (
    <div>
      {hasRoutines ? (
        <div>{routine ? <h1>{routine?.name}</h1> : <h1>Select a routine</h1>}</div>
      ) : (
        <div>
          <h1>No routines</h1>
        </div>
      )}
    </div>
  )
}

const Routine = () => {
  const { routine } = useRoutine()

  return (
    <IonList>
      {routine?.activities.map((activity) => (
        <IonItem key={activity.id}>
          <h2>{activity.name}</h2>
          <p>{activity.description}</p>
        </IonItem>
      ))}
    </IonList>
  )
}
