import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateHeaderComponent } from './candidate-header.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';
import {NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {SafePipe} from '../../pipe/safe.pipe';
import {By} from '@angular/platform-browser';
import {getUser} from '../../data-faker/data/user';

describe('CandidateHeaderComponent', () => {
  let component: CandidateHeaderComponent;
  let fixture: ComponentFixture<CandidateHeaderComponent>;
  let compiled;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
      ],
      declarations: [ CandidateHeaderComponent, SafePipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateHeaderComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should hide component if no data', () => {
    expect(compiled.query(By.css('.detail__header'))).toBeNull();
  });

  describe('if candidate', () => {
    beforeEach(() => {
      component.candidate = getUser();
      fixture.detectChanges();
    });
    it('should show component', () => {
      expect(compiled.query(By.css('.detail__header'))).toBeTruthy();
    });
    it('should have full name', () => {
      const fullName = compiled.query(By.css('.detail__full-name')).nativeElement.textContent;
      expect(fullName).toEqual(jasmine.any(String));
    });
    it('should hide control if type page - cv', () => {
      component.typePage = 'cv';
      fixture.detectChanges();
      const controlPanel = compiled.query(By.css('.control-panel')).nativeElement.hasAttribute('hidden');
      expect(controlPanel).toBeTruthy();
    });
  });

  describe('if candidate and type add', () => {
    beforeEach(() => {
      component.candidate = getUser();
      component.typePage = 'add';
      fixture.detectChanges();
    });
    it('should hide edit', () => {
      const detailBut = compiled.query(By.css('.detail__but-edit')).nativeElement.hasAttribute('hidden');
      expect(detailBut).toBeTruthy();
    });
    it('should show app-change-image if click by img', () => {
      compiled.query(By.css('.detail__wrap-img')).nativeElement.click();
      fixture.detectChanges();
      expect(compiled.query(By.css('.change-head'))).toBeTruthy();
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
