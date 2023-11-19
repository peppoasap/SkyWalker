import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { IPlanet } from '../../models/Planet.interface';
import { PlanetGeneratorService } from '../../services/planet-generator.service';
import { filter, repeat, take, tap } from 'rxjs';
import { RetrievePlanetResponse } from '../../models/meshy.interface';
import '@google/model-viewer';
import { Film } from '../../models/Film.enum';

@Component({
  selector: 'planet-viewer',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    @defer (when planet) { @if(planet) {
    <div class="w-full h-full grid grid-cols-4 p-4">
      <div
        class="col-start-1 row-start-1 col-end-3 row-end-1 flex flex-col gap-2 items-start text-left"
      >
        <p class="text-2xl font-semibold text-primary">{{ planet.name }}</p>
        <p class="text-sm">{{ planet.description }}</p>
      </div>

      <div class="col-start-4 row-start-1 col-end-5 row-end-3 self-start">
        @switch (planet.firstFilmAppearance) { @case (Film.NewHope) {
        <img
          class="w-full h-full rounded-md shadow-md object-contain"
          src="https://upload.wikimedia.org/wikipedia/en/8/87/StarWarsMoviePoster1977.jpg"
          alt="Star Wars: A New Hope"
        />
        } @case (Film.EmpireStrikesBack) {
        <img
          class="w-full h-full rounded-md shadow-md object-contain"
          src="https://upload.wikimedia.org/wikipedia/en/3/3f/The_Empire_Strikes_Back_%281980_film%29.jpg"
          alt="Star Wars: The Empire Strikes Back"
        />
        } @case (Film.ReturnOfTheJedi) {
        <img
          class="w-full h-full rounded-md shadow-md object-contain"
          src="https://upload.wikimedia.org/wikipedia/en/b/b2/ReturnOfTheJediPoster1983.jpg"
          alt="Star Wars: Return of the Jedi"
        />
        } @case (Film.PhantomMenace) {
        <img
          class="w-full h-full rounded-md shadow-md object-contain"
          src="https://upload.wikimedia.org/wikipedia/en/4/40/Star_Wars_Phantom_Menace_poster.jpg"
          alt="Star Wars: The Phantom Menace"
        />
        } @case (Film.AttackOfTheClones) {
        <img
          class="w-full h-full rounded-md shadow-md object-contain"
          src="https://upload.wikimedia.org/wikipedia/en/3/32/Star_Wars_-_Episode_II_Attack_of_the_Clones_%28movie_poster%29.jpg"
          alt="Star Wars: Attack of the Clones"
        />
        } @case (Film.RevengeOfTheSith) {
        <img
          class="w-full h-full rounded-md shadow-md object-contain"
          src="https://upload.wikimedia.org/wikipedia/en/9/93/Star_Wars_Episode_III_Revenge_of_the_Sith_poster.jpg"
          alt="Star Wars: Revenge of the Sith"
        />
        } @default {
        <img
          class="w-full h-full rounded-md shadow-md object-contain"
          src="https://upload.wikimedia.org/wikipedia/en/8/87/StarWarsMoviePoster1977.jpg"
          alt="Star Wars: A New Hope"
        />
        } }
      </div>

      <div
        class="col-start-1 row-start-2 col-end-5 row-end-4 flex flex-col gap-4 justify-center items-center self-end"
      >
        <!-- <model-viewer
          class="w-64 h-64"
          [src]="corsProxyAsset(testModel)"
          shadow-intensity="0.4"
          minimumRenderScale="1"
          camera-controls
          touch-action="pan-y"
        ></model-viewer> -->
        @defer (when model3d) { @if (model3d && model3d.status === 'SUCCEEDED')
        {
        <model-viewer
          class="w-full h-full"
          [src]="corsProxyAsset(model3d.model_urls.glb)"
          shadow-intensity="1"
          camera-controls
          minimumRenderScale="1"
        ></model-viewer>
        } @else if (model3d) {
        <progress
          class="progress progress-accent w-56"
          [value]="model3d.progress"
          max="100"
        ></progress>
        <p class="text-accent-focus text-sm text-center">
          Generating Planet Surface... [{{ model3d.status }}]
        </p>
        } } @placeholder (minimum 1000ms) {
        <div
          class="skeleton w-64 h-64 rounded-full shrink-0 bg-gray-200 opacity-30 animate-pulse"
        ></div>
        <button class="btn btn-accent btn-sm" (click)="startGeneration()">
          Inspect Planet Surface
        </button>
        }
      </div>

      <div
        class="col-start-1 row-start-5 col-end-3 row-end-6 flex flex-col gap-2 items-start justify-end"
      >
        <p class="text-base-content">
          <span class="font-semibold">Population:</span>
          {{ planet.population || 'UNKNOWN' }}
        </p>
        <p class="text-base-content">
          <span class="font-semibold">Terrain:</span>
          {{ planet.terrain.join(', ') }}
        </p>
        <p class="text-base-content">
          <span class="font-semibold">Climate:</span>
          {{ planet.climate.join(', ') }}
        </p>
        <p class="text-base-content">
          <span class="font-semibold">Landmarks:</span>
          {{ planet.landmarks.join(', ') }}
        </p>
      </div>

      <div
        class="col-start-3 row-start-5 col-end-5 row-end-6 flex flex-col gap-2 items-end justify-end"
      >
        <p class="text-base-content">
          <span class="font-semibold">Gravity:</span> {{ planet.gravity }}
        </p>
        <p class="text-base-content">
          <span class="font-semibold">Rotation Period:</span>
          {{ planet.rotation_period }}
        </p>
        <p class="text-base-content">
          <span class="font-semibold">Orbital Period:</span>
          {{ planet.orbital_period }}
        </p>
        <p class="text-base-content">
          <span class="font-semibold">Diameter:</span> {{ planet.diameter }}
        </p>
      </div>
    </div>
    } } @placeholder (minimum 1000ms) {
    <div class="flex flex-col gap-2 items-center">
      <p class="text-base-content">Generating Planet Surface...</p>
      <span class="loading loading-ring loading-lg"></span>
    </div>
    }
  `,
  styles: ``,
})
export class PlanetViewerComponent implements OnInit {
  @Input() planet: IPlanet | null = null;
  model3d: RetrievePlanetResponse | null = null;
  // testModel =
  //   'https://assets.meshy.ai/google-oauth2%7C106463940571149412634/tasks/018bcffa-07bf-7736-98c7-507659398cd2/output/model.glb?Expires=1700260663&Signature=DAtk3vVokZG1iFkxVXQh5YRkFSfCgBksNLrRrtm7lxIqANm76RPIgyUqQME-m3qJC2KlbIthO6ohR4ESMBhfHqqHtgEl3mGtGDS0FQuL2ls9MfAnl1bHGz7rrYw~pKy8Hb7spJ0Jo5ZpKSU2FIbfoCd2nJxuBNCEkp1lqFjEz2xGyfKArWTp8W3N-e9pyTT7d36S-F2hu2VmWAaeJWtvIlTjhFA-EIYEw~-NJZCc~8mZVbGm49uFf4rob-3JdzgiqQCSd82bLsv1n8rcBJn1zrdLmD2Ts9Ve30TiZn0fsxAb3gbIqCQZCUEvFMJ8ogLbOnWeJOvcqbv3Mb1oGcu1GQ__&Key-Pair-Id=KL5I0C8H7HX83';
  planetGenerator = inject(PlanetGeneratorService);
  taskId: string | null = null;
  pollingInterval: any;
  corsProxyAsset = (assetUrl: string) =>
    `https://corsproxy.io/?${encodeURIComponent(assetUrl)}`;
  Film = Film;

  ngOnInit() {}

  startGeneration() {
    if (this.planet) {
      this.planetGenerator
        .generate3d(this.planet.promptStyleFor3DGeneration)
        .subscribe({
          next: response => {
            this.taskId = response.result;
            this.startRetrievalPolling();
          },
          error: error => {
            console.error(error);
          },
        });
    }
  }

  startRetrievalPolling() {
    if (this.taskId) {
      this.planetGenerator
        .retrieve3d(this.taskId)
        .pipe(
          tap(response => {
            this.model3d = response;
          }),
          repeat({ delay: 5000 }),
          filter(response => response.status === 'SUCCEEDED'),
          take(1),
        )
        .subscribe();
    }
  }
}
