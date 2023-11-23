import { Component } from '@angular/core';
import { LayoutService } from '../../../../services/login/login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {

    valCheck: string[] = ['remember'];

    contrasena!: string;

    constructor(public layoutService: LayoutService) { }
}
