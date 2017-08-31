

import { TestBed, async, inject } from '@angular/core/testing';
import { Narrative } from "./narrative";
import { AboutItemComponent } from "./about-item.component";
import { ComponentFixture } from "@angular/core/testing";
import { DebugElement } from "@angular/core";
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from "@angular/router/Testing";

describe('About Item Component', () => {

  let testNarrative = new Narrative (
    "testGuid",
    "Test Narrative",
    "This is a Test Narrative",
    `<p>This is only a test.  If this was a real narrative... you'd know.`,
    ["test"]
  )

  let comp: AboutItemComponent;
  let fixture: ComponentFixture<AboutItemComponent>;
  let de: DebugElement;
  let els: HTMLElement[];
  let el: HTMLElement;

  beforeEach( async(() => {

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AboutItemComponent], // declare the test component
    })
    .compileComponents();

  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(AboutItemComponent);
    comp = fixture.componentInstance; // BannerComponent test instance
    comp.narrative = testNarrative;
    comp.loggedIn = false;

    fixture.detectChanges();

  });

  it('should create the component', async() =>{
    expect(comp).toBeTruthy();
  });


  it('should generate a panel w/o Edit Button', async() =>{
      de = fixture.debugElement.query(By.css("#aboutPanel"));
      expect(de).toBeTruthy();

      de = fixture.debugElement.query(By.css('#editNarrative'));
      expect(de).toBeNull();

      de = fixture.debugElement.query(By.css("#aboutBody"));
      expect(de).toBeTruthy();
      el = de.nativeElement;
      expect(el.textContent).toContain('This is only a test.')

  });


  it('should show the edit button if account is logged in', async() =>{
    comp.loggedIn= true;
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('#editNarrative'))
    expect(de).toBeTruthy();
  })


  it('should hide the panel', async() => {
    comp.narrative = null;
    fixture.detectChanges();
    de = fixture.debugElement.query(By.css("#aboutBox"));
    expect(de).toBeNull();
  });

});
