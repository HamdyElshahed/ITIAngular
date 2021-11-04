import { Component, Input, OnInit } from '@angular/core';
import { Filter } from 'src/app/models/asidefilter';

@Component({
  selector: 'app-aside-filter',
  templateUrl: './aside-filter.component.html',
  styleUrls: ['./aside-filter.component.sass']
})
export class AsideFilterComponent implements OnInit {
  @Input() filter!: Filter;
  constructor() { }

  ngOnInit(): void {
  }

}
