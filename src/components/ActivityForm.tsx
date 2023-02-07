import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import {
  IonInput,
  IonItem,
  IonLabel,
  IonCheckbox,
  IonList,
  IonTextarea,
  IonButton,
  IonDatetime,
  IonDatetimeButton,
  IonModal,
} from '@ionic/react'

import { Activity, Day, Days } from '../hooks/useRoutine'

interface ActivityFormProps {
  onCreate: (activity: Activity) => void
  onCancel?: () => void
  className?: string
  activity?: Activity
}

const emptyActivity: Activity = {
  id: '',
  name: '',
  days: [],
  startTime: dayjs().format(),
  endTime: dayjs().add(30, 'minutes').format(),
  description: '',
}

const ActivityForm: React.FC<ActivityFormProps> = ({ activity: initActivity, onCreate, onCancel, className }) => {
  const [activity, setActivity] = useState<Activity>(emptyActivity)

  useEffect(() => {
    if (initActivity) {
      setActivity(initActivity)
    }
  }, [initActivity])

  const handleInputChange = (event: CustomEvent) => {
    const { name, value } = event.target as HTMLInputElement
    setActivity({ ...activity, [name]: value })
  }

  const handleDaysChange = (event: CustomEvent) => {
    const { name, checked } = event.target as HTMLInputElement
    const newDay = name as Day
    setActivity((prevActivity) => {
      if (!checked) {
        return { ...prevActivity, days: prevActivity.days.filter((day) => day !== newDay) }
      } else {
        return { ...prevActivity, days: [...prevActivity.days, newDay] }
      }
    })
  }

  const handleSubmit = () => {
    onCreate(activity)
    setActivity(emptyActivity)
  }

  return (
    <div className={className}>
      <IonItem>
        <IonLabel position="stacked">Name</IonLabel>
        <IonInput name="name" value={activity.name} onIonChange={handleInputChange} />
      </IonItem>
      <IonItem>
        <IonLabel position="fixed">Start</IonLabel>
        <IonDatetimeButton datetime="startTime" />
        <IonModal keepContentsMounted={true}>
          <IonDatetime id="startTime" presentation="time" value={activity.startTime} />
        </IonModal>
      </IonItem>
      <IonItem>
        <IonLabel position="fixed">End</IonLabel>
        <IonDatetimeButton datetime="endTime" />
        <IonModal keepContentsMounted={true}>
          <IonDatetime id="endTime" presentation="time" value={activity.endTime} />
        </IonModal>
      </IonItem>
      <IonItem>
        <IonTextarea
          name="description"
          value={activity.description}
          onIonChange={handleInputChange}
          placeholder="Any additional info..."
        />
      </IonItem>
      <IonList>
        {Object.values(Days).map((day) => (
          <IonItem key={day}>
            <IonLabel>{day}</IonLabel>
            <IonCheckbox name={day} checked={activity.days.includes(day)} onIonChange={handleDaysChange} />
          </IonItem>
        ))}
      </IonList>
      <IonButton expand='block' onClick={handleSubmit}>Create Activity</IonButton>
      {onCancel && <IonButton fill="outline" expand='block' onClick={onCancel}>Cancel</IonButton>}
    </div>
  )
}

export default ActivityForm
