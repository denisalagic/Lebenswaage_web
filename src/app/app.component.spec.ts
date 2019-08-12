import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {TranslateFakeLoader, TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {MatIconModule} from '@angular/material';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule, TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader
          }
        }),
        MatIconModule
      ],
      providers: [ TranslateService ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'lebens-waage'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('lebens-waage');
  });

  it('should call next page function', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    component.totalPages = 4;
    component.currentPage = 1;

    spyOn(component, 'nextPage').and.callThrough();
    component.nextPage();

    expect(component.nextPage).toHaveBeenCalled();
    expect(component.currentPage).toBe(2);
  });

  it('should call previous page function', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    component.currentPage = 2;

    spyOn(component, 'previousPage').and.callThrough();
    component.previousPage();

    expect(component.previousPage).toHaveBeenCalled();
    expect(component.currentPage).toBe(1);
  });

  it('should call setLanguage function', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;
    component.currentPage = 2;

    spyOn(component, 'setLanguage').and.callThrough();
    component.setLanguage('en');

    expect(component.setLanguage).toHaveBeenCalled();
  });

});
