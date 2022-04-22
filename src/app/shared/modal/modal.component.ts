import { Component, Input, OnInit } from '@angular/core';
import { WatchService } from 'src/app/services/watch.service';



@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})


export class ModalComponent implements OnInit {

  constructor(private modalS:WatchService) { }

 

  @Input() modelo:string = '';

  ngOnInit(): void {
  }

  closemodal(){
    this.modalS.$modal.emit(false);
  }



}
