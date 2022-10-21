import { RouteLoc } from "../models/pipeline-loc.model";

export class PipelineService{
    routesData: RouteLoc[] = [];

    isUnique(route: RouteLoc): boolean {
        console.log(this.routesData)
        const existingRoute = this.routesData.find(e => e.lat == route.lat && e.lng == route.lng);
        if (existingRoute) {
            return false;
        } else {
            console.log("Duplicate Route Data");
            return true;
        }
    }
    
    allRoutes(data: any[]) {
        data.forEach((currentValue: any) => {
        // console.log(currentValue);
      currentValue.pipeline_routes.forEach((crrntValue: any) => {
          this.routesData.push({ lat: crrntValue.lat, lng: crrntValue.long });
        //   console.log(this.routesData);
    });

    });
    }
    addRoute(data: RouteLoc)
    {
        this.routesData.push(data);
    }

    deepIndexOf(arr, obj) {
        return arr.findIndex(function (cur) {
        return Object.keys(obj).every(function (key) {
        return obj[key] === cur[key];
        });
    });
    }
}