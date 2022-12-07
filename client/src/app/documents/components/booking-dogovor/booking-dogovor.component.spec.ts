import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingDogovorComponent } from './booking-dogovor.component';

describe('BookingDogovorComponent', () => {
  let component: BookingDogovorComponent;
  let fixture: ComponentFixture<BookingDogovorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingDogovorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingDogovorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
