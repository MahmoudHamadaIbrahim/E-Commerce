import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { OrdersService } from '../../core/services/orders.service';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../core/auth/services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-orders',
  imports: [DatePipe, RouterLink],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];
  private readonly authService = inject(AuthService);
  private readonly ordersService = inject(OrdersService);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  userId: string | null = null;

  ngOnInit(): void {
    this.userId = this.authService.getCurrentUserId();
    if (this.userId) {
      this.loadUserOrders(this.userId);
    }
  }

  loadUserOrders(userId: string) {
    if (!userId) return;

    this.ordersService.getUserOrders(userId).subscribe({
      next: (response) => {
        this.orders = response.map((order: any) => ({
          ...order,
          isExpanded: false,
        }));
        this.changeDetectorRef.detectChanges();
      },
    });
  }

  toggleOrder(order: any) {
    order.isExpanded = !order.isExpanded;
  }
}
