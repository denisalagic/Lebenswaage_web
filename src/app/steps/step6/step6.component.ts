import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {StepsService} from "../steps.service";

@Component({
  selector: 'app-step6',
  templateUrl: './step6.component.html',
  styleUrls: ['./step6.component.css']
})
export class Step6Component implements OnInit {
  @Output() step6Valid = new EventEmitter<any>();


  constructor(private stepsService: StepsService) {
  }

  ngOnInit() {
    this.step6Valid.emit({
      stepPosition: 6,
      valid: true
    });

    this.stepsService.trainingType = 'ARNBCK';
  }

}
