import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'

import AccountView from '../views/AccountView'

const AccountTab: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Account</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Account</IonTitle>
          </IonToolbar>
        </IonHeader>
        <AccountView />
      </IonContent>
    </IonPage>
  )
}

export default AccountTab
