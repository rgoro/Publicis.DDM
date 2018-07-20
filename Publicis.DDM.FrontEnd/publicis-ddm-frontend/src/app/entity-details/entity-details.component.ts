import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { EntityService } from '../entity.service';
import { EntityUserDefinedAttributesPipe } from '../entity-udas.pipe';

import { Entity } from '../entity';

@Component({
  selector: 'app-entity-details',
  templateUrl: './entity-details.component.html',
  styleUrls: ['./entity-details.component.css']
})
export class EntityDetailsComponent implements OnInit {

  constructor(private entityService: EntityService, private route: ActivatedRoute) { }

  @Input() disabled: boolean;
  @Input() entity: Entity;
  @Input() entityType: string;

  toggleDisabled(): void {
    this.disabled = !this.disabled;
  }

  save(): void {
    this.entityService.Update(this.entityType, this.entity.id, this.entity)
      .subscribe(
        response => {
          this.disabled = true
        }
      );
  }
  ngOnInit() {
    this.disabled = true;
  }

  ngOnChanges(simpleChanges) {
    if(simpleChanges.entity.previousValue && simpleChanges.entity.previousValue.id != simpleChanges.entity.currentValue.id)
    {
      this.disabled = true;
    }    
  }
}