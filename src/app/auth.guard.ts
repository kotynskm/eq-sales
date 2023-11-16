import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authGuard = () => {
  const loggedIn = inject(AuthService).isLoggedIn();

  if (loggedIn) {
    return true;
  } else {
    return false;
  }
};
