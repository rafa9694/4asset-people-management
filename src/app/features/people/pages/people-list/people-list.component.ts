import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { finalize } from 'rxjs';

import { Person } from '../../models/person.model';
import { PeopleService } from '../../services/people.service';
import { PersonFormComponent } from '../../components/person-form/person-form.component';
import { AppModalComponent } from '../../../../shared/components/app-modal/app-modal.component';

@Component({
  selector: 'app-people-list',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    PersonFormComponent,
    AppModalComponent
  ],
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss']
})
export class PeopleListComponent implements OnInit {

  people: Person[] = [
    {
      id: '1',
      name: 'Rafael Ribeiro',
      email: 'rafael@email.com',
      phone: '(27) 99999-9999',
      birthDate: '1998-05-10T00:00:00Z'
    },

    {
      id: '2',
      name: 'Ana Costa',
      email: 'ana@email.com',
      phone: '(11) 98888-8888',
      birthDate: '1995-08-21T00:00:00Z'
    },

    {
      id: '3',
      name: 'Carlos Mendes',
      email: 'carlos@email.com',
      phone: '(31) 97777-7777',
      birthDate: '2000-01-15T00:00:00Z'
    }
  ];

  // people: Person[] = [];
  loading = false;
  modalOpen = false;
  selectedPerson?: Person;

  constructor(
    private peopleService: PeopleService
  ) { }

  ngOnInit(): void {
    // this.loadPeople();
  }

  loadPeople(): void {

    this.loading = true;

    this.peopleService.findAll()
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (response) => {
          this.people = response;
        }
      });
  }

  openCreateModal(): void {
    this.selectedPerson = undefined;
    this.modalOpen = true;
  }

  openEditModal(person: Person): void {
    this.selectedPerson = person;
    this.modalOpen = true;
  }

  closeModal(): void {
    this.modalOpen = false;
  }

  submitPerson(payload: any): void {

    this.loading = true;

    const request = this.selectedPerson ?
      this.peopleService.update(this.selectedPerson.id, payload)
      : this.peopleService.create(payload);

    request
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: () => {

          this.closeModal();

          this.loadPeople();
        }
      });    
  }

  deletePerson(id: string): void {

    const confirmed = confirm('Deseja excluir essa pessoa?');

    if (!confirmed) {
      return;
    }

    this.peopleService.delete(id)
      .subscribe({
        next: () => {
          this.loadPeople();
        }
      });
  }
}