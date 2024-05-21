import { Directive, ElementRef, EventEmitter, Host, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { HttpClientService } from '../../services/common/http-client.service';
import { AlertifyService, MessageType, Position } from '../../services/admin/alertify.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent, DeleteState } from '../../dialogs/delete-dialog/delete-dialog.component';

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(private element: ElementRef, private _renderer: Renderer2, private httpClientService: HttpClientService, private alertify: AlertifyService,public dialog: MatDialog) {

  }

  @Input('appDelete') idElement: any;
  @Input() controller : string;
  @Output() callback: EventEmitter<any> = new EventEmitter();


  async onClick() {
    const id = this.idElement.id;

    await this.httpClientService.delete({
      controller: this.controller
    }, id).subscribe((res) => {
      this.alertify.message('Product deleted successfully', {
        messageType : MessageType.Success,
        position : Position.TopRight,
        dismissOthers : true
      });
      this.callback.emit();
    });
  }

  @HostListener('click')
  openDialog(): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
     width: '250px',
     data: DeleteState.Yes  
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == DeleteState.Yes){
        this.onClick();
      }
    });
  }

}



