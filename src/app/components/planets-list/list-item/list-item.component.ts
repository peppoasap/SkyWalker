import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IPlanet } from '../../../models/Planet.interface';

@Component({
  selector: 'list-item',
  standalone: true,
  template: `
    @if(item) {
    <div
      class="w-full min-h-16 p-4 flex flex-row gap-2 bg-neutral hover:bg-neutral-focus justify-between items-center rounded-md shadow-md"
    >
      <div class="flex flex-col gap-2">
        <p class="text-lg font-semibold text-primary">{{ item.name }}</p>
        <p class="text-xs">Population: {{ item.population || 'UNKNOWN' }}</p>
      </div>
      <button class="btn btn-accent btn-sm" (click)="setSatellite.emit(item)">
        View
      </button>
    </div>
    } @else {
    <div class="w-full min-h-16 p-4 bg-error rounded-md shadow-md">
      <p class="text-lg font-semibold text-error-content">Broken Planet</p>
    </div>
    }
  `,
  styles: ``,
})
export class ListItemComponent {
  @Input() item!: IPlanet;
  @Output() setSatellite = new EventEmitter<IPlanet>();
}
