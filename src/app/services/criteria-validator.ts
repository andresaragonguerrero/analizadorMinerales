import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
// interfaces
import { CriteriaMessage } from '../interfaces/criteria-message';

@Injectable({
  providedIn: 'root',
})
export class CriteriaValidatorService {
  private readonly resultSource = new BehaviorSubject<CriteriaMessage | null>(null);
  currentResult$ = this.resultSource.asObservable();

  setResult(result: CriteriaMessage) {
    this.resultSource.next(result);
  }
}
