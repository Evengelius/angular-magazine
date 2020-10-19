import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class ReloadRouterService {
    constructor(public readonly router: Router) {
        router.config.unshift({ path: 'RELOAD_PLACEHOLDER' });
    }

    public navigate(commands: any[], extras?: NavigationExtras): Promise<boolean> {
        return this.router
            .navigateByUrl('/RELOAD_PLACEHOLDER', {skipLocationChange: true})
            .then(() => this.router.navigate(commands, extras));
    }
}
