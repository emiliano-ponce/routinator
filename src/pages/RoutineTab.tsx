import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react'
import RoutineView from '../views/RoutineView'

const RoutineTab: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Today's Routine</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Routine</IonTitle>
          </IonToolbar>
        </IonHeader>
        <RoutineView />
      </IonContent>
    </IonPage>
  )
}

export default RoutineTab
