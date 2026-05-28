import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(
    private translate: TranslateService
  ) { }

  initialize(): void {

    this.translate.addLangs([
      'pt-BR',
      'en'
    ]);

    const language = localStorage.getItem('language') || 'pt-BR';

    this.translate.use(language);
  }

  changeLanguage(language: string): void {
    localStorage.setItem('language', language);
    this.translate.use(language);
  }
}