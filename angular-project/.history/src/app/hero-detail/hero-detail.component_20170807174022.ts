import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';

@Component({
  selector: 'hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {

  constructor() { }
  hero = Hero;
  ngOnInit() {
  }

}
