import { Component, OnInit} from '@angular/core';
import { setTheme } from 'ngx-bootstrap/utils';
import { BsModalRef} from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { Location } from '@angular/common'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  modalRef: BsModalRef;
  public isOn: boolean = false;
  sidebarOpen: boolean = false;
  constructor(private readonly location: Location){
    setTheme('bs5');
  }
  
  ngOnInit(): void{
  }

  isOnMethod(): boolean{
    console.log(this.location.path() !== '/login' && this.location.path() !=="")
    return this.location.path() !== '/login' && this.location.path() !==""
  }

  isSidebarOpen(sidebarOpen: boolean){
    this.sidebarOpen=sidebarOpen
  }
}
