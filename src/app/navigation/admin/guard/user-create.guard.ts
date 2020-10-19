import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

import { UserCreateComponent } from '../home/navigation/table/user/create/user-create.component';

@Injectable({
  providedIn: 'root'
})
export class UserCreateGuard implements CanDeactivate<UserCreateComponent> {
  canDeactivate(component: UserCreateComponent): Observable<boolean> | Promise<boolean> | boolean {
    if (component.registerForm.dirty && !component.submitted) {
      return confirm(`Navigate away and lose all changes done ?`);
    }
    return true;
  }
}
