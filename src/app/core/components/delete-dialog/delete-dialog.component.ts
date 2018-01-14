import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef, MatSnackBar, MatDialog, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'medi-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DeleteDialogComponent>) { }

  ngOnInit() {
  }

}
