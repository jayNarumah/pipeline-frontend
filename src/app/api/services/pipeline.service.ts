import { RouteLoc } from "../models/pipeline-loc.model";

export class PipelineService{
    routesData: RouteLoc[] = [];

    isUnique(route: RouteLoc): boolean {
        const existingRoute = this.routesData.find(e => e.lat == route.lat && e.lng == route.lng);
        if (existingRoute) {
            return false;
        } else {
            return true;
        }
    }
    
    allRoutes(data: any[]) {
        data.forEach((currentValue: any) => {
        currentValue.pipeline_routes.forEach((crrntValue: any) => {
        this.routesData.push({ lat: crrntValue.lat, lng: crrntValue.long });
    });
        });
    }
    addRoute(data: RouteLoc)
    {
        this.routesData.push(data);
    }

    removeRoute() {
        this.routesData.pop();
        console.log('Routes after removing: ',this.routesData)
    }
}