import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { finalize } from 'rxjs';

import { Person } from '../../models/person.model';
import { PeopleService } from '../../services/people.service';
import { PersonFormComponent } from '../../components/person-form/person-form.component';
import { AppModalComponent } from '../../../../shared/components/app-modal/app-modal.component';
import { ConfirmModalComponent } from '../../../../shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-people-list',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    PersonFormComponent,
    AppModalComponent,
    ConfirmModalComponent
  ],
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss']
})
export class PeopleListComponent implements OnInit {

  people: Person[] = [];
  loading = false;
  modalOpen = false;
  selectedPerson?: Person;
  confirmModalOpen = false;
  personToDelete?: Person;

  constructor(
    private peopleService: PeopleService
  ) { }

  ngOnInit(): void {
    this.loadPeople();
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
          this.people = response.results;
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

  openDeleteModal(person: Person): void {
    this.personToDelete = person;
    this.confirmModalOpen = true;
  }

  closeDeleteModal(): void {
    this.confirmModalOpen = false;
    this.personToDelete = undefined;
  }

  confirmDelete(): void {

    if (!this.personToDelete) {
      return;
    }

    this.loading = true;

    this.peopleService.delete(this.personToDelete.id)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: () => {
          this.closeDeleteModal();
          this.loadPeople();
        }
      });
  }
}