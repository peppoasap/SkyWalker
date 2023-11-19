import { Component, Signal, WritableSignal, signal } from '@angular/core';
import { PlanetsListComponent } from '../planets-list/planets-list.component';
import { PlanetViewerComponent } from '../planet-viewer/planet-viewer.component';
import { IPlanet } from '../../models/Planet.interface';

@Component({
  selector: 'app-navigator',
  standalone: true,
  imports: [PlanetsListComponent, PlanetViewerComponent],
  template: `
    <div
      class="w-full h-full rounded-md bg-base-200 shadow-lg flex-1 flex flex-row gap-2 p-2"
    >
      <div
        class="w-1/3 h-full flex flex-col justify-center items-center bg-base-300 rounded-md p-2"
      >
        @defer {
        <planets-list
          class="w-full h-full"
          [satelliteSignal]="planetSelected"
        ></planets-list>
        } @placeholder (minimum 1000ms) {
        <div class="flex flex-col gap-2 items-center">
          <p class="text-base-content">Connecting Satellite...</p>
          <span class="loading loading-ring loading-lg"></span>
        </div>
        }
      </div>
      <div class="w-2/3 h-full flex flex-col justify-center items-center">
        @defer (when planetSelected()) {
        <planet-viewer
          class="w-full h-full"
          [planet]="planetSelected()"
        ></planet-viewer>
        } @placeholder (minimum 1000ms) {
        <div class="flex flex-col gap-2 items-center">
          <p class="text-base-content">Waiting for coordinates...</p>
          <span class="loading loading-ring loading-lg"></span>
        </div>
        }
      </div>
    </div>
  `,
  styles: `
  :host {
    height: 100%;
    width: 100%;
  }
  `,
})
export class NavigatorComponent {
  planetSelected: WritableSignal<IPlanet | null> = signal(null);
}
