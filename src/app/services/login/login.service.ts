import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/enviroments/environment';
import { Login } from 'src/app/interfaces/login/login.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private myAppUrl: string;  
    private myApiUrl: string; 
  
    constructor(private http: HttpClient) { 
      this.myAppUrl = environment.endpoint
      this.myApiUrl = 'api/auth/login'
    }
  


  login(email: string, contrasena: string): Observable<any> {
    return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}`, { email, contrasena }).pipe(
      tap(response => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }


  isValidToken(token: string): boolean {
    return !!token; // Se asume que si hay un token, se considera válido
  }
  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }
}
