import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { AddOrderComponent } from '../../pages/addOrder/addOrder.component';
import { StaffComponent } from '../../pages/staff/staff.component';
import { AllOrderComponent } from '../../pages/allOrder/allOrder.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomerComponent } from 'app/pages/customer/customer.component';
import { DeliveryTaskComponent } from 'app/pages/deliveryTask/deliveryTask.component';
import { DeliveryReachedComponent } from 'app/pages/deliveryReached/deliveryReached.component';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule ,
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule
  ],
  declarations: [
    DeliveryReachedComponent,
    DeliveryTaskComponent,
    CustomerComponent,
    AllOrderComponent,
    StaffComponent,
    DashboardComponent,
    UserComponent,
    TypographyComponent,
    IconsComponent,

    NotificationsComponent,
    AddOrderComponent,
  ]
})

export class AdminLayoutModule {}
