import { CoreMenu } from '@core/types';

export const menu: CoreMenu[] = [
  // Dashboard
  // {
  //   id: 'dashboard',
  //   title: 'Dashboard',
  //   translate: 'MENU.DASHBOARD.COLLAPSIBLE',
    // type: 'collapsible',
    // role: ['Admin'], //? To hide collapsible based on user role
    // icon: 'home',
    // badge: {
    //   title: '',
    //   translate: 'MENU.DASHBOARD.BADGE',
    //   classes: 'badge-light-warning badge-pill'
    // },
    // children: [
      // {
      //   id: 'analytics',
      //   title: 'Analytics',
      //   translate: 'MENU.DASHBOARD.ANALYTICS',
      //   type: 'item',
      //   role: ['Admin'], //? To set multiple role: ['Admin', 'Client']
      //   icon: 'circle',
      //   url: 'dashboard/analytics'
      // },
      // {
        // If role is not assigned will be display to all
  //       id: 'Dashbord',
  //       title: 'Dashboard',
  //       translate: 'Dahboard',
  //       type: 'item',
  //       icon: 'circle',
  //       url: 'dashboard/ecommerce'
  //     },
  //   ]
  // },
  // dashboard
  {
    id: 'dashboard-section',
    type: 'section',
    title: 'Dashboard',
    // translate: 'MENU.CM.SECTION',
    icon: 'home',
    children: [
      
      {
        // If role is not assigned will be display to all
        id: 'Dashboard',
        title: 'Dashboard',
        translate: 'Dahboard',
        type: 'item',
        icon: 'circle',
        url: 'dashboard/ecommerce'
      },
    ]
  },
  //Company
  {
    id: 'company-section',
    type: 'section',
    title: 'Company',
    // translate: 'MENU.CM.SECTION',
    icon: 'home',
    children: [
      
      {
        id: 'company',
        title: 'Manage Company',
        // translate: 'MENU.CM.MAPS',
        icon: 'home',
        type: 'item',
        url: 'dashboards/company'
      }
    ]
  },
  //pipeline
  {
    id: 'pipeline-section',
    type: 'section',
    title: 'Pipeline',
    // translate: 'MENU.CM.SECTION',
    icon: 'bar-chart-2',
    children: [
      {
        id: 'pipeline-type',
        title: 'Pipeline Type',
        // translate: 'MENU.CM.MAPS',
        icon: 'framer',
        type: 'item',
        url: 'dashboards/pipeline-type'

      },
      {
        id: 'pipeline',
        title: 'Pipeline',
        // translate: 'MENU.CM.MAPS',
        icon: 'activity',
        type: 'item',
        url: 'dashboards/pipeline'
      },
      {
        id: 'pipeline-route',
        title: 'Pipeline Route',
        // translate: 'MENU.CM.MAPS',
        icon: 'dribbble',
        type: 'item',
        url: 'dashboards/pipeline-route'
      }
    ]
  },
  //Company
  {
    id: 'map-section',
    type: 'section',
    title: 'Map',
    // translate: 'MENU.CM.SECTION',
    icon: 'home',
    children: [
      
      {
        id: 'map',
        title: 'Map',
        // translate: 'MENU.CM.MAPS',
        icon: 'map',
        type: 'item',
        url: 'dashboards/map'
      },
      {
        id: 'google-maps',
        title: 'Google Maps',
        // translate: 'MENU.CM.MAPS',
        icon: 'globe',
        type: 'item',
        url: 'dashboards/google-map'
      }
    ]
  },
  
];
