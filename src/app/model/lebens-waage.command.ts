export class LebensWaageCommand {
  public operation: string;
  public machineCode: string;
  public paymentType: string;
  public trainingType: string;
  public activity: string;
  public goal: string;
  public gender: string;
  public age: number;
  public additionalEnergyIntake: number;
  public recommendedEnergyIntake: number;
  public height: number;
  public weight: number;
  public bmi: number;
  public targetWeight: number;
  public waistCircumference: number;
  public blacklistedFoodTypes: string[];
  public email: string;
  public gdprAgreement: boolean;
  public mealPlanScheduleId: number;

  constructor() {}
}
