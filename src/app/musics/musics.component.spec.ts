import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicsComponent } from './musics.component';

describe('MusicsComponent', () => {
  let component: MusicsComponent;
  let fixture: ComponentFixture<MusicsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MusicsComponent]
    });
    fixture = TestBed.createComponent(MusicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
