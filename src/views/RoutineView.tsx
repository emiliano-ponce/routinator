import { IonDatetime, IonItem, IonList } from '@ionic/react'

import useRoutine, { IRoutine } from '../hooks/useRoutine'

export interface RoutineViewProps {}

export default function RoutineView(props: RoutineViewProps) {
  const { routine, routines, selectRoutine } = useRoutine()
  const hasRoutines = routines.length > 0

  return (
    <div>
      {hasRoutines ? (
        <div>{routine ? <Routine routine={routine} /> : <h1>Select a routine</h1>}</div>
      ) : (
        <NoRoutines />
      )}
    </div>
  )
}

const NoRoutines = () => {
  return <div>
    <h1>No routines</h1>
    <button onClick={() => alert('clicked!')}>Create New Routine</button>
  </div>
}

const Routine = ({ routine }: { routine: IRoutine }) => {
  const { activities } = routine

  return (
    <div>
      <IonDatetime />
      <IonList>
        {activities.map(({ id, name, description, days, endTime, startTime }) => (
          <IonItem key={id}>
            <h2>{name}</h2>
            <p>{description}</p>
          </IonItem>
        ))}
      </IonList>
    </div>
  )
}
