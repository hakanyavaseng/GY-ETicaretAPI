import { Injectable } from '@angular/core';
declare var alertify : any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  message(message: string,alertifyOptions: Partial<AlertifyOptions>) {

    alertify.set('notifier', 'position', alertifyOptions.position);
    alertify.set('notifier', 'delay', alertifyOptions.delay);

    const msg = alertify[alertifyOptions.messageType](message);
    if(alertifyOptions.dismissOthers){
      msg.dismissOthers();
    }
  }

  dismissAll() {
    alertify.dismissAll();
  }
}

export class AlertifyOptions {
  messageType : MessageType = MessageType.Message;
  position : Position = Position.TopRight;
  delay : number = 5;
  dismissOthers: boolean = false;
}

export enum MessageType {
  Error = "error",
  Message = "message",
  Notify = "notify",
  Success = "success",
  Warning = "warning"
}

export enum Position {
  TopRight = "top-right",
  TopLeft = "top-left",
  TopCenter = "top-center",
  BottomRight = "bottom-right",
  BottomLeft = "bottom-left",
  BottomCenter = "bottom-center"
}