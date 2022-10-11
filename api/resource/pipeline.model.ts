import { PipelineRoute } from "./pipeline-route.model";

export interface Pipeline{
  id?: number,
  //company: Company
  name: string,
  start_lat: number,
  end_lat: number,
  start_long: number,
  end_long: number,
  pipeline_routes?: PipelineRoute[],

}
