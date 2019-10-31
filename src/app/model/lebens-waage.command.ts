import {VideoListModel} from './video-list.model';

export class LebensWaageCommand {
  constructor(private machineId: number,
              private paymentType: string,
              private trainingType: string,
              private activity: string,
              private goal: string,
              private gender: string,
              private age: number,
              private height: number,
              private weight: number,
              private bmi: number,
              private targetWeight: number,
              private waistCircumference: number,
              private hipCircumference: number,
              private blacklistedFoodTypes: string[],
              private email: string,
              private gdprAgreement: boolean,
              private mealPlanTags: string []) {}
}
