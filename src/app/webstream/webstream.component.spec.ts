import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebstreamComponent } from './webstream.component';

describe('WebstreamComponent', () => {
  let component: WebstreamComponent;
  let fixture: ComponentFixture<WebstreamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebstreamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebstreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
