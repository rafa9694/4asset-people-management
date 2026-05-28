import { Person } from "./person.model"

export interface PersonResponse {
  pagination: {
    currentPage: number
    limit: number
    totalItems: number
    totalPages: number
  }
  results: Person[];
}

