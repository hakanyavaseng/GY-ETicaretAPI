import { Component, Input } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { HttpClientService } from '../http-client.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AlertifyService, MessageType, Position } from '../../admin/alertify.service';
import { Toast, ToastrService } from 'ngx-toastr';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {

  constructor(private httpClientService: HttpClientService, private alertify: AlertifyService, private toastr: CustomToastrService) { }

  public files: NgxFileDropEntry[];
  @Input() options: Partial<FileUploadOptions>;

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;

    const fileData: FormData = new FormData();

    for (const file of files) {
      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        fileData.append(_file.name, _file, file.relativePath);
      });
    }

    //Send fileData to the server
    this.httpClientService.post({
      controller: this.options.controller,
      action: this.options.action,
      queryString: this.options.queryString,
      headers: new HttpHeaders().set('responseType', 'blob')
    }, fileData).subscribe(data => {
      const message : string = "File uploaded successfully"

      if (this.options.isAdminPage) {
        this.alertify.message(message, {
          messageType: MessageType.Success,
          position: Position.TopRight
        });
      }
      else {
        this.toastr.message(message, "File Upload Success", {
          messageType: ToastrMessageType.Success,
          position: ToastrPosition.TopRight
        });
      }

    }, (errorResponse: HttpErrorResponse) => {

      const message : string = "Failed to upload file: ";

      if (this.options.isAdminPage) {
        this.alertify.message(message, {
          messageType: MessageType.Error,
        });
      }
      else {
        this.toastr.message(message, "File Upload Error", {
          messageType: ToastrMessageType.Error,
          position : ToastrPosition.TopRight
        });
      }

    })



  }
}

export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;
  isAdminPage?: boolean = false;
}