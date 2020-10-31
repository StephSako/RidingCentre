import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  // tslint:disable-next-line:variable-name
  public isEmpty(_string: string): boolean {
    return (!_string || 0 === _string.trim().length);
  }
}
