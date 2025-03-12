import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (typeof window !== 'undefined') { // Ensures execution in the browser
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    // ✅ Allow access only for admins
    if (user && user.role === 'admin') {
      return true;
    }

    // ❌ Redirect non-admin users to home page
    router.navigate(['/']);
    return false;
  }

  return false;
};
