import { Company } from "./company.model";
import { PipelineRoute } from "./pipeline-route.model";
import { PipelineType } from "./pipeline-type.model";

export interface Pipeline {
  id?: number,
  uid?: string,
  //company: Company
  name: string,
  pipelineTypeId?: number,
  size: number,
  // start_lat: number,
  // end_lat: number,
  // start_long: number,
  // end_long: number,
  companyId: number,
  pipelineRoutes?: PipelineRoute[],
  PipelineType?: PipelineType,
  lat?: number,
  lng?: number,
  Company?: Company,

}
