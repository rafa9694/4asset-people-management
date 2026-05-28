import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../models/person.model';
import { environment } from '../../../environments/environments';
import { PersonPayload } from '../models/person-payload.model';
import { PersonResponse } from '../models/person-response.model';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  private readonly apiUrl =
    `${environment.apiUrl}/persons`;

  constructor(
    private http: HttpClient
  ) { }

  findAll(): Observable<PersonResponse> {
    return this.http.get<PersonResponse>(this.apiUrl);
  }

  findById(id: string): Observable<Person> {
    return this.http.get<Person>(`${this.apiUrl}/${id}`);
  }

  create(payload: PersonPayload): Observable<Person> {
    return this.http.post<Person>(this.apiUrl, payload);
  }

  update(id: string, payload: PersonPayload): Observable<Person> {
    return this.http.patch<Person>(`${this.apiUrl}/${id}`, payload);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}