import { Company } from "./company.model";
import { PipelineRoute } from "./pipeline-route.model";

export interface Pipeline{
  id?: number,
  //company: Company
  name: string,
  pipeline_type_id: number,
  size: number,
  start_lat: number,
  end_lat: number,
  start_long: number,
  end_long: number,
  company_id: number,
  pipeline_routes?: PipelineRoute[],
  lat?: number,
  long?: number,
  company?: Company,

}
