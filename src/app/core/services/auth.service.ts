import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { environment } from '../../environments/environments.development';
import { LoginRequest } from '../../features/auth/models/login-request.model';
import { RegisterRequest } from '../../features/auth/models/register-request-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl = environment.apiUrl;
  private readonly tokenKey = 'access_token';

  constructor(private http: HttpClient) { }

  login(payload: LoginRequest): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/auth/login`,payload)
      .pipe(
        tap((response) => {
          this.setToken(
            response.token
          );
        })
      );
  }

  register(payload: RegisterRequest): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/auth/register`, payload);
  }

  setToken(token: string): void {
    localStorage.setItem(
      this.tokenKey,
      token
    );
  }

  getToken(): string | null {
    return localStorage.getItem(
      this.tokenKey
    );
  }

  removeToken(): void {
    localStorage.removeItem(
      this.tokenKey
    );
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    this.removeToken();
  }
}