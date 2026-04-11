import { FlowbiteService } from './../../core/services/flowbite.service';
import { Component, computed, inject, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { AuthService } from '../../core/auth/services/auth.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  private readonly authService = inject(AuthService);
  private readonly platformId = inject(PLATFORM_ID);
  readonly exactMatch = { exact: true };
  isLogged = computed(() => this.authService.isLogged());

  constructor(private FlowbiteService: FlowbiteService) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('freshToken')) {
        this.authService.isLogged.set(true);
      }
    }

    this.FlowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }

  logOut(): void {
    this.authService.signOut();
  }
}
