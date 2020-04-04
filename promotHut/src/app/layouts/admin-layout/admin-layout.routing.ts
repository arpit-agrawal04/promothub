import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { AddOrderComponent } from 'app/pages/addOrder/addOrder.component';
import { StaffComponent } from 'app/pages/staff/staff.component';
import { AllOrderComponent } from 'app/pages/allOrder/allOrder.component';
import { CustomerComponent } from 'app/pages/customer/customer.component';
import { DeliveryTaskComponent } from 'app/pages/deliveryTask/deliveryTask.component';
import { DeliveryReachedComponent } from 'app/pages/deliveryReached/deliveryReached.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user',           component: UserComponent },
    { path: 'table',          component: TableComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'addOrder',        component: AddOrderComponent },
    { path: 'editOrder/:id',        component: AddOrderComponent },
    { path: 'staffMangement',        component: StaffComponent },
    { path: 'customers',        component: CustomerComponent },
    { path: 'orderList',        component: AllOrderComponent },
    { path: 'deliveryTask',        component: DeliveryTaskComponent },
    { path: 'deliveryReached/:id',        component: DeliveryReachedComponent },
];
