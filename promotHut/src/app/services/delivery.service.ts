import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
  })
export class DeliveryService {
    constructor(private apiService: ApiService) {}
    cancelOrder(data) {
        return this.apiService.midWare('post', 'cancelOrder', data)
     }
     todayDeliveryTask(data) {
        return this.apiService.midWare('post', 'todayDeliveryTask', data)
     }
     rescheduleOrder(data) {
      return this.apiService.midWare('post', 'rescheduleOrder', data)
   }
   deliveryBoyReached(data) {
      return this.apiService.midWare('post', 'deliveryBoyReached', data)
   }
   deliveryUpdate(data) {
      return this.apiService.midWare('post', 'deliveryUpdate', data)
   }
}