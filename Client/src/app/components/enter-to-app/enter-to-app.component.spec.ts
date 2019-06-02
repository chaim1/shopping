import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterToAppComponent } from './enter-to-app.component';

describe('EnterToAppComponent', () => {
  let component: EnterToAppComponent;
  let fixture: ComponentFixture<EnterToAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterToAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterToAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
