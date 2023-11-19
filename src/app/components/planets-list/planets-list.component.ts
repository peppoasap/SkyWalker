import { Component, Input, WritableSignal } from '@angular/core';
import { IPlanet } from '../../models/Planet.interface';
import { ListItemComponent } from './list-item/list-item.component';
import { Film } from '../../models/Film.enum';

@Component({
  selector: 'planets-list',
  standalone: true,
  imports: [ListItemComponent],
  template: `
    @if( satelliteSignal ) {
    <div class="w-full h-full flex flex-col gap-2">
      <div class="flex flex-col gap-2 flex-1">
        @for (item of planets; track $index) {
        <list-item [item]="item" (setSatellite)="satelliteSignal.set(item)" />
        } @empty {
        <p class="text-accent">No planets found</p>
        }
      </div>

      <div class="w-full h-16 flex flex-row justify-start items-end gap-2">
        <p>
          @if( planets.length === 1 ) { There is {{ planets.length }} planet on
          the radar. } @else{ There are {{ planets.length }} planets on the
          radar.}
        </p>
      </div>
    </div>
    } @else {
    <p class="text-center text-xs text-accent">
      System Error: Connect the satellite to the radar.
    </p>
    }
  `,
})
export class PlanetsListComponent {
  @Input() satelliteSignal: WritableSignal<IPlanet | null> | null = null;

  planets: IPlanet[] = [
    {
      name: 'Tatooine',
      description: 'A desert planet in the Outer Rim Territories.',
      population: 200000,
      terrain: ['Desert'],
      rotation_period: '23 hours',
      orbital_period: '304 days',
      diameter: '10465 km',
      climate: ['Arid'],
      gravity: '1 standard',
      landmarks: ['Mos Eisley', 'Mos Espa'],
      additional_details: [
        'Sand dunes',
        'Rocky outcrops',
        'Moisture vaporators',
      ],
      firstFilmAppearance: Film.NewHope,
      promptStyleFor3DGeneration:
        'desert environment, sand dunes, rocky outcrops, moisture vaporators',
    },
    {
      name: 'Coruscant',
      description:
        'A city-covered planet serving as the capital of the Galactic Republic.',
      population: 1000000000,
      terrain: ['Urban'],
      rotation_period: '24 hours',
      orbital_period: '365 days',
      diameter: '12240 km',
      climate: ['Temperate'],
      gravity: '1 standard',
      landmarks: ['Senate Building', 'Jedi Temple'],
      additional_details: ['Skyscrapers', 'Advanced technology'],
      firstFilmAppearance: Film.PhantomMenace,
      promptStyleFor3DGeneration:
        'urban environment, cityscape, skyscrapers, advanced technology',
    },
    {
      name: 'Endor',
      description: 'A forested moon in orbit around the gas giant Endor.',
      population: 3000000,
      terrain: ['Forest'],
      rotation_period: '18 hours',
      orbital_period: '402 days',
      diameter: '4900 km',
      climate: ['Temperate'],
      gravity: '0.85 standard',
      landmarks: ['Ewok Village', 'Shield Generator'],
      additional_details: ['Dense vegetation', 'Tree canopies'],
      firstFilmAppearance: Film.ReturnOfTheJedi,
      promptStyleFor3DGeneration:
        'forest environment, dense vegetation, tree canopies',
    },
    {
      name: 'Naboo',
      description: 'A lush, green planet in the Mid Rim.',
      population: 4500000000,
      terrain: ['Grasslands', 'Swamps', 'Forests'],
      rotation_period: '26 hours',
      orbital_period: '312 days',
      diameter: '12120 km',
      climate: ['Temperate'],
      gravity: '1 standard',
      landmarks: ['Theed', 'Lake Country'],
      additional_details: ['Grasslands', 'Swamps', 'Diverse ecosystems'],
      firstFilmAppearance: Film.PhantomMenace,
      promptStyleFor3DGeneration:
        'lush environment, grasslands, swamps, diverse ecosystems',
    },
    {
      name: 'Hoth',
      description: 'An icy planet in the Outer Rim Territories.',
      population: 0,
      terrain: ['Tundra', 'Ice caves'],
      rotation_period: '23 hours',
      orbital_period: '549 days',
      diameter: '7200 km',
      climate: ['Frozen'],
      gravity: '1.1 standard',
      landmarks: ['Echo Base'],
      additional_details: ['Icy environment', 'Tundra', 'Ice caves'],
      firstFilmAppearance: Film.EmpireStrikesBack,
      promptStyleFor3DGeneration:
        'icy environment, tundra, ice caves, frozen landscape',
    },
  ];

  constructor() {}
}
