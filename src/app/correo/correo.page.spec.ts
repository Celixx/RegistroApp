import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CorreoPage } from './correo.page';

describe('CorreoPage', () => {
  let component: CorreoPage;
  let fixture: ComponentFixture<CorreoPage>;

  beforeEach(waitForAsync () => {
    fixture = TestBed.createComponent(CorreoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
