import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Buss from '@/views/BussesInfo/busses-info.vue';
import BusStops from '@/views/BusStops/bus-stops.vue';
import BusLines from '@/views/BusLines/bus-lines.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/buss/bus-lines",
  },
  {
    path: "/buss",
    component: Buss,
    children: [
      {
        path: "bus-lines",
        component: BusLines,
      },
      {
        path: "bus-stops",
        component: BusStops,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
