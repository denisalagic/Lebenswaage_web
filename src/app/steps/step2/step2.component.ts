import {Component, ElementRef, EventEmitter, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
import {StepsService} from '../steps.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.css']
})
export class Step2Component implements OnInit {

  @Output() step2Valid = new EventEmitter<any>();
  @ViewChild('ageSlider', {static: false}) ageSlider: ElementRef;
  @ViewChild('ageSliderTooltip', {static: false}) ageSliderTooltip: ElementRef;


  public selectedGender: string = null;
  public selectedAge: number = 0;

  constructor(private stepsService: StepsService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private renderer: Renderer2) {
  }


  ngOnInit() {
    this.step2Valid.emit({
      stepPosition: 2,
      valid: false
    });
  }

  public selectGender(gender: string): void {
    this.selectedGender = gender;
    this.stepsService.selectedGender = gender;

    if (this.selectedGender != null && this.selectedAge) {
      this.stepsService.selectedAge = this.selectedAge;
      this.stepsService.selectedGender = this.selectedGender;
      this.step2Valid.emit({
        stepPosition: 2,
        valid: true
      });
    }
  }

  onInputChange(event: any) {
    if (event.target) {
      this.selectedAge = event.target.value;
      this.stepsService.selectedAge = event.target.value;
      this.positionTooltip();
    }
  }

  private positionTooltip() {
    let width = this.ageSlider.nativeElement.offsetWidth;
    let min = this.ageSlider.nativeElement.min;
    let max = this.ageSlider.nativeElement.max;
    let value = this.selectedAge;
    let bubblePostion: number = 0;

    let newPoint = (value - min) / (max - min);

    // Prevent bubble from going beyond left or right (unsupported browsers)
    if (newPoint <= 0) {
      bubblePostion = 0;
    } else if (newPoint >= 1) {
      bubblePostion = width;
    } else {
      bubblePostion = width * newPoint;
    }

    this.renderer.setStyle(this.ageSliderTooltip.nativeElement, 'left', this.remapValue(bubblePostion) + 'px');
    this.ageSliderTooltip.nativeElement.value = value;
    if (this.selectedGender != null && this.selectedAge) {
      this.stepsService.selectedAge = this.selectedAge;
      this.stepsService.selectedGender = this.selectedGender;
      this.step2Valid.emit({
        stepPosition: 2,
        valid: true
      });
    }
  }

  private remapValue(value: number) {
    let oldPercentage = (value) / (1219);
    return ((1196 - 13) * oldPercentage) + 13;
  }

  public increaseAge() {
    this.selectedAge++;
    this.positionTooltip();
  }

  public decreaseAge() {
    this.selectedAge--;
    this.positionTooltip();
  }


}
