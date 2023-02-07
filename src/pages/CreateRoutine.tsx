import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonBackButton } from '@ionic/react'

import useRoutine from '../hooks/useRoutine'
import RoutineForm from '../components/RoutineForm'

const CreateRoutine = () => {
  const { createRoutine } = useRoutine()

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Create Routine</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <RoutineForm onCreate={createRoutine} />
      </IonContent>
    </IonPage>
  )
}

export default CreateRoutine
