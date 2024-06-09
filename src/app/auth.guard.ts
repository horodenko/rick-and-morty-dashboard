import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  /**
   * @description
   * Redirects user to sign-in page if he's not logged in
   */
  if (!authService.isAuth.value) {
    router.navigate(['/sign-in']);
    return false;
  }

  return authService.isAuth.value;
};
