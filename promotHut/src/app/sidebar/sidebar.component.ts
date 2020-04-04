import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    type?: string
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard',     title: 'Dashboard',         icon: 'nc-bank',       class: '' },
    { path: '/icons',         title: 'Icons',             icon: 'nc-diamond',    class: '' },
    { path: '/maps',          title: 'Maps',              icon: 'nc-pin-3',      class: '' },
    { path: '/notifications', title: 'Notifications',     icon: 'nc-bell-55',    class: '' },
    { path: '/user',          title: 'User Profile',      icon: 'nc-single-02',  class: '' },
    { path: '/table',         title: 'Table List',        icon: 'nc-tile-56',    class: '' },
    { path: '/typography',    title: 'Typography',        icon: 'nc-caps-small', class: '' },
    { path: '/dashboard',     title: 'Dashboard',  type: 'owner'   ,     icon: 'nc-bank',       class: '' },
    { path: '/addOrder',         title: 'New Order',      type: 'owner'   ,     icon: 'nc-bag-16',    class: '' },
    { path: '/orderList',          title: 'Orders',     type: 'owner'    ,      icon: 'nc-basket',      class: '' },
    { path: '/staffMangement', title: 'Staff Management',  type: 'owner'  ,  icon: 'nc-badge',    class: '' },
    { path: '/customers',          title: 'Customers',   type: 'owner'  ,     icon: 'nc-single-02',  class: '' },
    { path: '/Earnings',         title: 'Earnings',     type: 'owner'  ,     icon: 'nc-money-coins',    class: '' },
    { path: '/table',         title: 'History',     type: 'owner'  ,     icon: 'nc-tile-56',    class: '' },
    { path: '/upgrade',       title: 'Upgrade to PRO',    icon: 'nc-spaceship',  class: 'active-pro' },
    { path: '/dashboard',     title: 'Dashboard',  type: 'delivery'   ,     icon: 'nc-bank',       class: '' },
    { path: '/deliveryTask',     title: 'Task',  type: 'delivery'   ,     icon: ' nc-delivery-fast',       class: '' },
    { path: '/deliveryTaskHistory',     title: 'Task History',  type: 'delivery'   ,     icon: 'nc-tile-56',       class: '' },

];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    userType: string;
    userName: string;
    ngOnInit() {
        this.userType = localStorage.getItem('type')
        this.userName = localStorage.getItem('name')
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
