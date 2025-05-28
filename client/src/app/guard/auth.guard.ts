import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { IntegrationService } from '../service/integration.service';

export const authGuard: CanActivateFn = (route, state) => {

  const integration = inject(IntegrationService);
  const router = inject(Router);
  
  const path = state.url;
  
  if ((path === "/logout" || path === "/favorites") && !integration.user) {
    return router.parseUrl('login');
  }

  if ((path === "/login" || path === "/register") && integration.user) {
    return router.parseUrl('');
  }
  
  if ((path === "/add" || path === "/edit") && integration.user?.roles !== "ADMIN") {
    return router.parseUrl('error');
  }

  return true;
};
