import { Component, OnDestroy } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-reactive',
  template: '',
  standalone: true,
})
export class ReactiveComponent implements OnDestroy {
  private _destroy$: ReplaySubject<boolean> = new ReplaySubject(1);

  public get destroy$(): ReplaySubject<boolean> {
    return this._destroy$;
  }

  public ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }
}
