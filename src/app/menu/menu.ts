import { CoreMenu } from '@core/types';

export const menu: CoreMenu[] = [
  // Dashboard
  {
    id: 'dashboard',
    title: 'Dashboard',
    translate: 'MENU.DASHBOARD.COLLAPSIBLE',
    type: 'section',
    icon: 'home',
    badge: {
      title: '2',
      translate: 'MENU.DASHBOARD.BADGE',
      // classes: 'badge-light-warning badge-pill'
    },
    children: [
      {
        // If role is not assigned will be display to all
        id: 'dashboard',
        title: 'Dashboard',
        translate: 'MENU.DASHBOARD.ECOMMERCE',
        type: 'item',
        icon: 'box',
        url: 'dashboard/ecommerce'
      }
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
    ]
  },
  //Company
  {
    id: 'map-section',
    type: 'section',
    title: 'Maps',
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
        title: 'Google Map',
        // translate: 'MENU.CM.MAPS',
        icon: 'globe',
        type: 'item',
        url: 'dashboards/google-map'
      }
    ]
  },
  
];
