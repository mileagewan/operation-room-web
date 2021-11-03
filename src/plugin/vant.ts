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
  Switch
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
  Switch
]

export const vantPlugins = {
  install: function(app: App) {
    plugins.forEach((item) => {
      // app.component(item.name, item);
      app.use(item)
    })
  }
}
