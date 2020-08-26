import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CodebookModel} from './model/codebook.model';
import {environment} from '../environments/environment';
import {map} from 'rxjs/operators';
import {LebensWaageCommand} from './model/lebens-waage.command';
import {StepsService} from './steps/steps.service';

@Injectable({
  providedIn: 'root'
})
export class ApiCallsService {

  private token: string = environment.token;

  constructor(private http: HttpClient,
              private stepsService: StepsService) { }

  public getGoalList(): Observable<CodebookModel[]> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.token
      })
    };

    return this.http.get<CodebookModel[]>(environment.apiUrl + 'goals', httpOptions)
      .pipe(map(resp => {
        return resp;
      }));
  }

  public getExerciseGroups(): Observable<any[]> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.token
      })
    };

    return this.http.get<any[]>(environment.apiUrl + 'exercisegroups', httpOptions)
      .pipe(map(resp => {
        return resp;
      }));
  }

  public getAcitivityTypes(): Observable<CodebookModel[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.token
      })
    };

    return this.http.get<CodebookModel[]>(environment.apiUrl + 'activities', httpOptions)
      .pipe(map(resp => {
        return resp;
      }));
  }

  public getBlacklistedFoodTypes(): Observable<CodebookModel[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.token
      })
    };

    return this.http.get<CodebookModel[]>(environment.apiUrl + 'blacklistedfoodtypes', httpOptions)
      .pipe(map(resp => {
        return resp;
      }));
  }

  public getMealTags(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.token
      })
    };

    return this.http.get<any>(environment.apiUrl + 'mealplantags', httpOptions)
      .pipe(map(resp => {
        return resp;
      }));
  }


  public getMealPlanSchedules(): Observable<any> {
    const machineCode: string = environment.machineCode;

    const command: LebensWaageCommand = new LebensWaageCommand();
    command.operation = 'FIND';
    command.machineCode = machineCode;
    command.paymentType = 'CRD';
    command.trainingType = this.stepsService.trainingType;
    command.activity = this.stepsService.activity;
    command.goal = this.stepsService.goal;
    command.gender = this.stepsService.selectedGender;
    command.age = this.stepsService.selectedAge;
    command.height = this.stepsService.height;
    command.weight = this.stepsService.weight;
    command.bmi = this.stepsService.bmi;
    command.targetWeight = this.stepsService.targetWeight;
    command.waistCircumference = this.stepsService.waist;
    command.blacklistedFoodTypes = this.stepsService.foodsNotIncluded;
    command.gdprAgreement = this.stepsService.gdprAgreement;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.token
      })
    };

    return this.http.post<any>(environment.apiUrl + 'user/session', command, httpOptions)
      .pipe(map(resp => {
        return resp;
      }));
  }

  public sendEmail(email: string): Observable<LebensWaageCommand> {
    const machineCode: string = environment.machineCode;

    const command: LebensWaageCommand = new LebensWaageCommand();
    command.operation = 'SAVE';
    command.machineCode = machineCode;
    command.paymentType = 'CRD';
    command.additionalEnergyIntake = this.stepsService.additionalEnergy;
    command.recommendedEnergyIntake = this.stepsService.energyInput;
    command.trainingType = this.stepsService.trainingType;
    command.activity = this.stepsService.activity;
    command.goal = this.stepsService.goal;
    command.gender = this.stepsService.selectedGender;
    command.age = this.stepsService.selectedAge;
    command.height = this.stepsService.height;
    command.weight = this.stepsService.weight;
    command.bmi = this.stepsService.bmi;
    command.targetWeight = this.stepsService.targetWeight;
    command.waistCircumference = this.stepsService.waist;
    command.blacklistedFoodTypes = this.stepsService.foodsNotIncluded;
    command.gdprAgreement = this.stepsService.gdprAgreement;
    command.email = email;
    command.mealPlanScheduleId = this.stepsService.mealPlanScheduleId;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.token
      })
    };

    return this.http.post<any>(environment.apiUrl + 'user/session', command, httpOptions)
      .pipe(map(resp => {
        return resp;
      }));
  }
}
