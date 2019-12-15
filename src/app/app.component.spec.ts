import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {By} from '@angular/platform-browser';
import {TitleService} from './title.service';
import {getTestScheduler, hot} from 'jasmine-marbles';
import {DebugElement} from '@angular/core';
import createSpyObj = jasmine.createSpyObj;
import SpyObj = jasmine.SpyObj;
import {asyncScheduler, of} from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let de: DebugElement;
  let titleService: SpyObj<TitleService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        {
          provide: TitleService,
          useFactory: () => createSpyObj(['getTitle'])
        }
      ]
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    titleService = TestBed.get(TitleService);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have a title 'angular-showcase'`, () => {
    const title$ = hot('(x|)', {x: 'test-value'});
    titleService.getTitle.and.returnValue(title$);

    fixture.detectChanges(); // run on init (call service and assign observable)

    const titleSpy = jasmine.createSpy();
    component.title$.subscribe(titleSpy);
    getTestScheduler().flush(); // flush observables

    expect(titleService.getTitle).toHaveBeenCalled();
    expect(titleSpy).toHaveBeenCalledWith('test-value');
  });

  it(`should have a title 'angular-showcase' (same as prev but with fake async)`, fakeAsync(() => {
    const title$ = of('test-value', asyncScheduler);
    titleService.getTitle.and.returnValue(title$);

    fixture.detectChanges(); // run on init (call service and assign observable)

    const titleSpy = jasmine.createSpy();
    component.title$.subscribe(titleSpy);
    tick(); // flush pending timers

    expect(titleService.getTitle).toHaveBeenCalled();
    expect(titleSpy).toHaveBeenCalledWith('test-value');
  }));

  it('should render title (same as prev, but check html instead of observable)', () => {
    const title$ = hot('(x|)', {x: 'test-value'});
    titleService.getTitle.and.returnValue(title$);

    fixture.detectChanges(); // run on init (call service and assign observable)
    getTestScheduler().flush(); // flush observables
    fixture.detectChanges(); // run change detection after observable finish

    const content = fixture.debugElement.query(By.css('.content span'));
    expect(content.nativeElement.textContent)
      .toContain('test-value app is running!');
  });

  it('should render title (same as prev but with fake async)', fakeAsync(() => {
    const title$ = of('test-value', asyncScheduler);
    titleService.getTitle.and.returnValue(title$);

    fixture.detectChanges(); // run on init (call service and assign observable)
    tick(); // flush pending timers
    fixture.detectChanges(); // run change detection after observable finish

    const content = fixture.debugElement.query(By.css('.content span'));
    expect(content.nativeElement.textContent)
      .toContain('test-value app is running!');
  }));
});
