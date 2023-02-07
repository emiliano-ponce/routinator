import React, { useMemo, useState } from 'react'
import { IonButton, IonInput, IonItem, IonLabel, IonList } from '@ionic/react'

import ActivityForm from './ActivityForm'
import { Activity, IRoutine } from '../hooks/useRoutine'

interface ICreateRoutine extends Omit<IRoutine, 'id'> {}

interface CreateRoutineProps {
  onCreate: (routine: ICreateRoutine) => void
}

const RoutineForm = ({ onCreate }: CreateRoutineProps) => {
  const [adding, setAdding] = useState(false)
  const [routine, setRoutine] = useState<ICreateRoutine>({
    name: '',
    description: '',
    activities: [],
  })

  const isValid = useMemo(() => routine.name && routine.activities.length > 0, [routine])

  const handleInputChange = (event: CustomEvent) => {
    const { name, value } = event.target as HTMLInputElement
    setRoutine({ ...routine, [name]: value })
  }

  const handleAddActivity = (newActivity: Activity) => {
    setRoutine((prevRoutine) => ({
      ...prevRoutine,
      activities: [...prevRoutine.activities, newActivity],
    }))
    setAdding(false)
  }

  const onSubmit = () => {
    onCreate(routine)
  }

  return (
    <form onSubmit={onSubmit}>
      <IonItem>
        <IonLabel position="stacked">Name</IonLabel>
        <IonInput name="name" value={routine.name} onIonChange={handleInputChange} />
      </IonItem>
      <IonItem>
        <IonLabel position="stacked">Description</IonLabel>
        <IonInput name="description" value={routine.description} onIonChange={handleInputChange} />
      </IonItem>
      <IonList>
        {routine.activities.map((activity) => (
          <IonItem key={activity.id}>
            <IonLabel>{activity.name}</IonLabel>
          </IonItem>
        ))}
      </IonList>
      {adding ? (
        <ActivityForm onCreate={handleAddActivity} onCancel={() => setAdding(false)} />
      ) : (
        <IonButton expand="block" onClick={() => setAdding(true)}>
          Add Activity
        </IonButton>
      )}
      <IonButton disabled={!isValid} expand="block" onClick={onSubmit}>
        Submit
      </IonButton>
    </form>
  )
}

export default RoutineForm
