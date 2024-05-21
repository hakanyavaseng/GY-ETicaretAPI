import { Directive, ElementRef, EventEmitter, Host, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { HttpClientService } from '../../services/common/http-client.service';
import { AlertifyService, MessageType, Position } from '../../services/admin/alertify.service';

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(private element: ElementRef, private _renderer: Renderer2, private httpClientService: HttpClientService, private alertify: AlertifyService) {

  }

  @Input('appDelete') idElement: any;
  @Output() callback: EventEmitter<any> = new EventEmitter();


  @HostListener('click')
  onClick() {
    const id = this.idElement.id;

    this.httpClientService.delete({
      controller: "Products"
    }, id).subscribe((res) => {
      this.alertify.message('Product deleted successfully', {
        messageType : MessageType.Success,
        position : Position.TopRight,
        delay : 5000,
        dismissOthers : true
      });
      this.callback.emit();
    });
  }





}


