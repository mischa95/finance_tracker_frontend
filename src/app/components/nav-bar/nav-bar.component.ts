import { Component,EventEmitter,OnInit, Output } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/services/auth.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit{
  modalRef: BsModalRef;
  sidebarShow: boolean = false;
  @Output() onSidebarChange: EventEmitter<boolean> = new EventEmitter();

  constructor(private router: Router, private authService: AuthService, private modalService: BsModalService){}

  ngOnInit(): void {
  }

  goToDashboard(): void {
    this.router.navigateByUrl('/expenses');
  }
  goToStatistics(): void {
    this.router.navigateByUrl('/statistics');
  }
  goToProfile(): void {
    this.router.navigateByUrl('/profile');
  }

  sidebarShowMethod(): void{
    this.sidebarShow = !this.sidebarShow;

    this.onSidebarChange.emit(this.sidebarShow);


    if(this.sidebarShow){
      this.onSidebarChange.emit(true);
    }else{
      this.onSidebarChange.emit(false);
    }
  }

  logout(){
    this.modalRef = this.modalService.show(ConfirmationDialogComponent, {
      initialState: {
        title: 'Log out',
        text: 'Are you sure you want to log out?'
      },
      class: 'modal-md',
      animated: false
    });
    
    this.modalRef.content.onclose.subscribe((result: any) => {
      if(result){
        this.onSidebarChange.emit(false);
        this.authService.logout(true);
      }
  })
  }
}
