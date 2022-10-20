import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipelineTypeComponent } from './pipeline-type.component';

describe('PipelineTypeComponent', () => {
  let component: PipelineTypeComponent;
  let fixture: ComponentFixture<PipelineTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PipelineTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PipelineTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
