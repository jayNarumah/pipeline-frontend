import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipelineRouteComponent } from './pipeline-route.component';

describe('PipelineRouteComponent', () => {
  let component: PipelineRouteComponent;
  let fixture: ComponentFixture<PipelineRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PipelineRouteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PipelineRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
