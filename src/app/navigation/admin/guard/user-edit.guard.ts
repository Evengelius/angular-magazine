import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

import { UserEditComponent } from '../home/navigation/table/user/edit/user-edit.component';

@Injectable({
  providedIn: 'root'
})
export class UserEditGuard implements CanDeactivate<UserEditComponent> {
  canDeactivate(component: UserEditComponent): Observable<boolean> | Promise<boolean> | boolean {
    if (component.userForm.dirty && !component.submitted) {
      // @ts-ignore
      const name = component.userForm.get('username').value;
      // @ts-ignore
      const firstname = component.userForm.get('username').value;
      return confirm(`Navigate away and lose all changes done to ${firstname} ${name}?`);
    }
    return true;
  }
}
