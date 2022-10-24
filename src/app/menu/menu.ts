import { CoreMenu } from '@core/types';

//? DOC: http://localhost:7777/demo/vuexy-angular-admin-dashboard-template/documentation/guide/development/navigation-menus.html#interface

export const menu: CoreMenu[] = [
  // Dashboard
  {
    id: 'dashboard',
    title: 'Dashboard',
    translate: 'MENU.DASHBOARD.COLLAPSIBLE',
    type: 'collapsible',
    // role: ['Admin'], //? To hide collapsible based on user role
    icon: 'home',
    badge: {
      title: '2',
      translate: 'MENU.DASHBOARD.BADGE',
      classes: 'badge-light-warning badge-pill'
    },
    children: [
      {
        id: 'analytics',
        title: 'Analytics',
        translate: 'MENU.DASHBOARD.ANALYTICS',
        type: 'item',
        role: ['Admin'], //? To set multiple role: ['Admin', 'Client']
        icon: 'circle',
        url: 'dashboard/analytics'
      },
      {
        // If role is not assigned will be display to all
        id: 'ecommerce',
        title: 'eCommerce',
        translate: 'MENU.DASHBOARD.ECOMMERCE',
        type: 'item',
        icon: 'circle',
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
        icon: 'archive',
        type: 'item',
        url: 'dashboards/pipeline-type'

      },
      {
        id: 'pipeline',
        title: 'Pipeline',
        // translate: 'MENU.CM.MAPS',
        icon: 'droplet',
        type: 'item',
        url: 'dashboards/pipeline'
      },
      {
        id: 'pipeline-route',
        title: 'Pipeline Route',
        // translate: 'MENU.CM.MAPS',
        icon: 'circle',
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
      }
    ]
  },
 
  // Charts & Maps
  {
    id: 'charts-maps',
    type: 'section',
    title: 'Charts & Maps',
    // translate: 'MENU.CM.SECTION',
    icon: 'bar-chart-2',
    children: [
      {
        id: 'charts',
        title: 'Charts',
        // translate: 'MENU.CM.CHARTS.COLLAPSIBLE',
        type: 'collapsible',
        icon: 'pie-chart',
        badge: {
          title: '2',
          // translate: 'MENU.CM.CHARTS.BADGE',
          classes: 'badge-light-danger badge-pill'
        },
        // children: [
        //   {
        //     id: 'apex',
        //     title: 'Apex',
        //     translate: 'MENU.CM.CHARTS.APEX',
        //     type: 'item',
        //     icon: 'circle',
        //     url: 'charts-and-maps/apex'
        //   },
        //   {
        //     id: 'chartJs',
        //     title: 'ChartJS',
        //     translate: 'MENU.CM.CHARTS.CHARTJS',
        //     type: 'item',
        //     icon: 'circle',
        //     url: 'charts-and-maps/chartjs'
        //   }
        // ]
      },
      {
        id: 'google-maps',
        title: 'Google Maps',
        // translate: 'MENU.CM.MAPS',
        icon: 'map',
        type: 'item',
        url: 'dashboards/google-map'
      }
    ]
  },
  
];
