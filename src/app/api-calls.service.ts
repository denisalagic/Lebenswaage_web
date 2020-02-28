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


  public getMealPlanTags(): Observable<CodebookModel[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this.token
      })
    };

    return this.http.get<CodebookModel[]>(environment.apiUrl + 'mealplantags', httpOptions)
      .pipe(map(resp => {
        return resp;
      }));
  }

  public sendEmail(email: string): Observable<LebensWaageCommand> {
    const machineCode: string = environment.machineCode;

    const command: LebensWaageCommand = new LebensWaageCommand('SAVE',
      machineCode,
      'CRD',
      this.stepsService.trainingType,
      this.stepsService.activity,
      this.stepsService.goal,
      this.stepsService.selectedGender,
      this.stepsService.selectedAge,
      this.stepsService.height,
      this.stepsService.weight,
      this.stepsService.bmi,
      this.stepsService.targetWeight,
      this.stepsService.waist,
      this.stepsService.hips,
      this.stepsService.foodsNotIncluded,
      email,
      this.stepsService.gdprAgreement,
      this.stepsService.mealPlanTags
    );

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
