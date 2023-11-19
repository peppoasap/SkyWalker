import { Film } from './Film.enum';

export interface IPlanet {
  name: string;
  description: string;
  population: number;
  terrain: string[];
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string[];
  landmarks: string[];
  additional_details: string[];
  gravity: string;
  firstFilmAppearance: Film;
  promptStyleFor3DGeneration: string;
}
