import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
  })
export class OwnerService {
    constructor(private apiService: ApiService) {}
    getBasicAdd() {
       return this.apiService.midWare('post', 'getBasicAdd', {})
    }
    SignStaffUser(data) {
      return this.apiService.midWare('post', 'SignStaffUser', data)
   }
   findCustomer(data) {
      return this.apiService.midWare('post', 'findCustomer', data)

   }
   addOrder(data) {
      return this.apiService.midWare('post', 'addOrder', data)
   }
   getCompleteStaffDetails(data) {
      return this.apiService.midWare('post', 'getCompleteStaffDetails', data)
   }
   getStaffComp(data) {
      return this.apiService.midWare('post', 'getStaffComp', data)
   }
   UpdateStaffUser(data) {
      return this.apiService.midWare('post', 'UpdateStaffUser', data)
   }
   GetAllCustomers(data) {
      return this.apiService.midWare('post', 'GetAllCustomers', data)
   }
   GetAllOrders(data) {
      return this.apiService.midWare('post', 'GetAllOrders', data)
   }
   infoToEditOrder(data) {
      return this.apiService.midWare('post', 'infoToEditOrder', data)
   }
   deleteOrder(data) {
      return this.apiService.midWare('post', 'deleteOrder', data)
   }
}
