import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-gdpr-modal',
  templateUrl: './gdpr-modal.component.html',
  styleUrls: ['./gdpr-modal.component.css']
})
export class GdprModalComponent {

  constructor(
    public dialogRef: MatDialogRef<GdprModalComponent>) {}

  onClickClose(): void {
    this.dialogRef.close();
  }

}
