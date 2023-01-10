import { RouteLoc } from "../models/pipeline-loc.model";
import { PolylineOption } from "./google-map.service";

export class PipelineService {
    routesData: RouteLoc[] = [];
    // mapCoords = [];
    polylineOptions: PolylineOption[] = [];

    isUnique(route: RouteLoc): boolean {
        return true;
        const existingRoute = this.routesData.find(e => e.lat == route.lat && e.lng == route.lng);
        if (existingRoute) {
            return false;
        } else {
            return true;
        }
    }

    pushPolyline(data: PolylineOption) {
        this.polylineOptions.push(data);
    }

    removePolyline() {
        this.polylineOptions.pop()
    }

    allRoutes(data: any[]) {
        this.polylineOptions = []
        data.forEach((currentValue: any) => {
            let mapCords = [];
            let color = currentValue.Company.color;
            console.log(currentValue)

            currentValue.pipelineRoutes.forEach((crrntValue: any) => {
                mapCords.push({ lat: parseFloat(crrntValue.lat), lng: parseFloat(crrntValue.lng) })
                this.routesData.push({ lat: crrntValue.lat, lng: crrntValue.lng });
            });
            this.polylineOptions.push({
                path: mapCords,
                strokeColor: color,
                strokeOpacity: 1.0,
                strokeWeight: 4,
            })
        });
    }

    addRoute(data: RouteLoc) {
        // this.mapCoords.push({lat: parseFloat(data.lat), lng: parseFloat(data.lng)})
        this.routesData.push(data);
    }

    removeRoute() {
        this.routesData.pop();
        // this.mapCoords.pop()
    }
}