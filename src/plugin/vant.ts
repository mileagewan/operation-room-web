import { App } from 'vue'
import {
  Button,
  List,
  Cell,
  Tabbar,
  TabbarItem,
  PullRefresh,
  Swipe,
  SwipeItem,
  Grid,
  GridItem,
  NavBar,
  Tag,
  Tab,
  Tabs,
  Icon,
  Sticky,
  Card,
  Sidebar,
  Dialog,
  SidebarItem,
  Popup,
  Toast,
  Field,
  Switch,
  Loading,
  Overlay,
} from 'vant'
const plugins = [
  Button,
  List,
  Cell,
  Tabbar,
  TabbarItem,
  PullRefresh,
  Swipe,
  SwipeItem,
  Grid,
  GridItem,
  NavBar,
  Tag,
  Tab,
  Tabs,
  Icon,
  Sticky,
  Card,
  Sidebar,
  Dialog,
  SidebarItem,
  Popup,
  Toast,
  Field,
  Switch,
  Loading,
  Overlay,
]

export const vantPlugins = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  install(app: App) {
    plugins.forEach((item) => {
      // app.component(item.name, item);
      app.use(item)
    })
  }
}
