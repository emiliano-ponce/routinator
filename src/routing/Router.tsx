import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { checkboxOutline, personOutline, settingsOutline } from 'ionicons/icons'
import { Redirect, Route, RouteComponentProps, StaticContext } from 'react-router'

import AccountTab from '../pages/AccountTab'
import RoutineTab from '../pages/RoutineTab'
import SettingsTab from '../pages/SettingsTab'
import CreateRoutine from '../pages/CreateRoutine'

export const Routes = {
  account: '/account',
  routine: '/routine',
  createRoutine: '/routine/create',
  editRoutine: '/routine/edit/:id',
  settings: '/settings',
} as const

type RouteType = typeof Routes
type RouteKey = keyof RouteType
type RoutePath = RouteType[RouteKey]
export interface IRoute {
  path: RoutePath
  name: RouteKey
  component: React.ComponentType<any> | React.ComponentType<RouteComponentProps<any, StaticContext, unknown>>
}

export const routes: IRoute[] = [
  {
    path: Routes.account,
    name: 'account',
    component: AccountTab,
  },
  {
    path: Routes.routine,
    name: 'routine',
    component: RoutineTab,
  },
  {
    path: Routes.settings,
    name: 'settings',
    component: SettingsTab,
  },
  {
    path: Routes.createRoutine,
    name: 'createRoutine',
    component: CreateRoutine,
  },
  {
    path: Routes.editRoutine,
    name: 'editRoutine',
    component: CreateRoutine,
  },
]

type TabConfig = {
  icon: string
  label: string
  path: RoutePath
}

const tabs: TabConfig[] = [
  { label: 'Account', icon: personOutline, path: Routes.account },
  { label: 'Routine', icon: checkboxOutline, path: Routes.routine },
  { label: 'Settings', icon: settingsOutline, path: Routes.settings },
]

const Router = () => {
  return (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          {routes.map((route) => {
            const { path, component } = route
            return <Route key={path} exact {...{ path, component }} />
          })}
          <Redirect exact from="/" to="/routine" />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          {tabs.map((tab) => {
            const { icon, label, path } = tab
            return (
              <IonTabButton key={label} tab={label} href={path}>
                <IonIcon icon={icon} />
                <IonLabel>{label}</IonLabel>
              </IonTabButton>
            )
          })}
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  )
}

export default Router
