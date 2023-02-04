import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { checkboxOutline, personOutline, settingsOutline } from 'ionicons/icons'
import { Redirect, Route, RouteComponentProps, StaticContext } from 'react-router'

import AccountTab from '../pages/AccountTab'
import RoutineTab from '../pages/RoutineTab'
import SettingsTab from '../pages/SettingsTab'

export const Routes = {
  account: '/account',
  routine: '/routine',
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
]

type TabConfig = {
  [K in RouteKey]: { label?: string; icon?: string }
}

const tabs: TabConfig = {
  account: { label: 'Account', icon: personOutline },
  routine: { label: 'Routine', icon: checkboxOutline },
  settings: { label: 'Settings', icon: settingsOutline },
}

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
          {routes.map((route) => {
            const { path, name } = route
            const { icon, label } = tabs[name]
            return (
              <IonTabButton key={name} tab={name} href={path}>
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
