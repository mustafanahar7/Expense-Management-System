import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExMangSysComponent } from './ex-mang-sys.component';

describe('ExMangSysComponent', () => {
  let component: ExMangSysComponent;
  let fixture: ComponentFixture<ExMangSysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExMangSysComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExMangSysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
