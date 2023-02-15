export interface IContent {
  target_title: string;
  target_id: number;
  target_type: string;
  score: number;
  status: string;
  episodes: number;
  rewatches: number;
  text: string | null;
}
