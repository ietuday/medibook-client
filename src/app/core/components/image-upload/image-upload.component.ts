import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, Inject, Output, EventEmitter, Input } from '@angular/core';
// import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';
import { MatSnackBar } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ApiService } from './../../../core/services/api.service';
import { EndpointService } from '../../../core/config/api.config';

@Component({
  selector: 'medi-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})

export class ImageUploadComponent {
  resourceUrl = 'assets/images/noavatar.png';

  @Output() photoSelected = new EventEmitter();
  @Input()
  set photoId(id) {
    if (id) {
      this.resourceUrl = this.endpointService.get('VIEW_IMAGE').url + id;
    }
  };


  constructor(
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private endpointService: EndpointService) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(ImageUploadDialog, {
      width: '600px',
      height: '630px'
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.photoSelected.emit(result);
      }
    });
  }

  selectImage() {
    this.openDialog();
  }

}


@Component({
  selector: 'medi-image-upload-dialog',
  templateUrl: 'image-upload-dialog.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadDialog {

  image: any = new Image();
  imageData: any;
  // cropperSettings: CropperSettings;
  selectedImage;
  showCrop: boolean;
  croppedImage;
  croppedWidth: number;
  croppedHeight: number;


  @ViewChild('selectedPicture') selectedPicture: any;
  // @ViewChild('cropper', undefined) cropper: ImageCropperComponent;

  constructor(
    public dialogRef: MatDialogRef<ImageUploadDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    private api: ApiService) {
    // this.cropperSettings = new CropperSettings();
    // this.cropperSettings.width = 200;
    // this.cropperSettings.height = 200;
    // this.cropperSettings.keepAspect = false;
    // this.cropperSettings.croppedWidth = 200;
    // this.cropperSettings.croppedHeight = 200;
    // this.cropperSettings.canvasWidth = 500;
    // this.cropperSettings.canvasHeight = 300;
    // this.cropperSettings.minWidth = 100;
    // this.cropperSettings.minHeight = 100;
    // // this.cropperSettings.rounded = true;
    // this.cropperSettings.minWithRelativeToResolution = false;
    // this.cropperSettings.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
    // this.cropperSettings.cropperDrawSettings.strokeWidth = 2;
    // this.cropperSettings.noFileInput = true;

    this.imageData = {};
  }

  /**
   * @function fileChangeListener
   * @description recieves the image selected and crops it
   * @param event
   */
  fileChangeListener($event) {
    const file: File = $event.target.files[0];
    const myReader: FileReader = new FileReader();
    const that = this;
    myReader.onloadend = function (loadEvent: any) {
      that.image.src = loadEvent.target.result;
      // that.cropper.setImage(that.image);
    };
    myReader.readAsDataURL(file);
    this.croppedImage = file
  }

  /**
   * @function onSelectFile
   * @description clicks the input element which is hidden on ui
   */
  onSelectFile() {
    this.selectedPicture.nativeElement.click();
  }

  /**
   * @function onUploadImage
   * @description uploads the image to the server
   */
  onUploadImage() {
    const data = new FormData();
    data.append('file', this.croppedImage);

    const apiParams = {
      'data': data
    };

    this.api.request('UPLOAD_IMAGE', apiParams).subscribe(response => {
      this.dialogRef.close(response.resourceId);
    })
  }

}
