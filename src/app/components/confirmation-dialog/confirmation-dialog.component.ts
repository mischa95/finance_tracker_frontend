import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent {
  title: string;
  text: string;
  public onclose: Subject<boolean>;

  constructor(private bsmodalref: BsModalRef) { }
  
  ngOnInit(): void {
    this.onclose = new Subject();
  }

  public confirm(): void {
      this.onclose.next(true);
      this.bsmodalref.hide();
  }

  public decline(): void {
      this.onclose.next(false);
      this.bsmodalref.hide();
  }
}
