export interface MakePlanetResponse {
  result: string;
}

export interface RetrievePlanetResponse {
  id: string;
  model_url: string;
  model_urls: {
    glb: string;
    fbx: string;
    usdz: string;
  };
  thumbnail_url: string;
  object_prompt: string;
  style_prompt: string;
  art_style: string;
  negative_prompt: string;
  progress: number;
  started_at: number;
  created_at: number;
  expires_at: number;
  finished_at: number;
  status: string;
  texture_urls: [
    {
      base_color: string;
      metallic: string;
      normal: string;
      roughness: string;
    },
  ];
}
