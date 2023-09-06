import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PreguntaPage } from './pregunta.page';

describe('PreguntaPage', () => {
  let component: PreguntaPage;
  let fixture: ComponentFixture<PreguntaPage>;

  beforeEach(waitForAsync () => {
    fixture = TestBed.createComponent(PreguntaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
