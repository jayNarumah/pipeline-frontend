import { RouteLoc } from "../models/pipeline-loc.model";

export class PipelineService{
    routesData: RouteLoc[] = [];

    isUnique(route: RouteLoc): boolean {
        console.log("Routes: ",this.routesData)
        const existingRoute = this.routesData.find(e => e.lat == route.lat && e.lng == route.lng);
        if (existingRoute) {
            return false;
        } else {
            return true;
        }
    }
    
    allRoutes(data: any[]) {
        data.forEach((currentValue: any) => {
        // console.log(currentValue);
      currentValue.pipeline_routes.forEach((crrntValue: any, index: number) => {
          this.routesData.push({ lat: crrntValue.lat, lng: crrntValue.long });
    });

        });
        
          console.log('Original Data',this.routesData)
    }
    addRoute(data: RouteLoc)
    {
        console.log(data)
        this.routesData.push(data);
    }

    removeRoute() {
        // this.routesData.pop();
        
        this.routesData.pop();
        console.log('Routes after removing: ',this.routesData)
    }
}