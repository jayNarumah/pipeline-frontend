import { RouteLoc } from "../models/pipeline-loc.model";
import { polylineOption } from "./google-map.service";

export class PipelineService{
    routesData: RouteLoc[] = [];
    mapCoords = [];
    polylineOptions: polylineOption[] = [];

    isUnique(route: RouteLoc): boolean {
        const existingRoute = this.routesData.find(e => e.lat == route.lat && e.lng == route.lng);
        if (existingRoute) {
            return false;
        } else {
            return true;
        }
    }

    pushPolyline(data: polylineOption) {
        this.polylineOptions.push(data);
    }

    removePolyline() {
        this.polylineOptions.pop()
    }
    
    allRoutes(data: any[]) {
        data.forEach((currentValue: any) => {
            let mapCords = [];
            currentValue.pipeline_routes.forEach((crrntValue: any) => {
            mapCords.push({lat: parseFloat(crrntValue.lat), lng: parseFloat(crrntValue.long)})
            this.routesData.push({ lat: crrntValue.lat, lng: crrntValue.long });
            });
            this.polylineOptions.push({
                path: mapCords,
                strokeColor: '#32a1d0',
                strokeOpacity: 1.0,
                strokeWeight: 4,
            })
        });
    }
    addRoute(data: RouteLoc)
    {
        this.mapCoords.push({lat: parseFloat(data.lat), lng: parseFloat(data.lng)})
        this.routesData.push(data);
    }

    removeRoute() {
        this.routesData.pop();
        this.mapCoords.pop()
        console.log('Routes after removing: ',this.routesData)
    }
}