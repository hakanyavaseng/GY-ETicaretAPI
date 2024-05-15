import { Component } from '@angular/core';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private toastr: CustomToastrService) {
    this.toastr.message("Hello", "Hakan", {
      messageType: ToastrMessageType.Success,
      position: ToastrPosition.TopRight
    });
  }
  title = 'ETicaretClient';

}

$(document).ready(function() {
  console.log('Hello from jQuery!');
});
