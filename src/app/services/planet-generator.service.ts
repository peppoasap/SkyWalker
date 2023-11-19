import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/env';
import { Observable } from 'rxjs';
import { RetrievePlanetResponse } from '../models/meshy.interface';

@Injectable({
  providedIn: 'root',
})
export class PlanetGeneratorService {
  constructor(private http: HttpClient) {}

  generate3d(style: string): Observable<{ result: string }> {
    return this.http.post<{ result: string }>(
      `${environment.meshy}/v1/text-to-3d`,
      {
        object_prompt: 'a spheric planet',
        style_prompt: style,
        enable_pbr: false,
      },
      { headers: { Authorization: `Bearer ${environment.meshyKey}` } },
    );
  }

  retrieve3d(id: string): Observable<RetrievePlanetResponse> {
    return this.http.get<RetrievePlanetResponse>(
      `${environment.meshy}/v1/text-to-3d/${id}`,
      { headers: { Authorization: `Bearer ${environment.meshyKey}` } },
    );
  }
}
