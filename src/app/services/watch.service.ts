import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WatchService {

  constructor() { }

  $modal = new EventEmitter<any>();
}
