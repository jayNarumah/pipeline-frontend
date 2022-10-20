import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { environment } from "environments/environment";
import { PipelineRoute } from "../models/pipeline-route.model";

@Injectable({
    providedIn: 'root',
})
export class PipelineRouteEndpoint {
    baseUrl = `${environment.apiUrl}/pipeline-route`;


    constructor(private readonly httpClient: HttpClient) { }

    list() {
        return this.httpClient.get<{ data: PipelineRoute[] }>(`${this.baseUrl}`);
    }

    single(id: number) {
        return this.httpClient.get<{ data: PipelineRoute }>(`${this.baseUrl}/${id}`);
    }

    create(data: PipelineRoute) {
        return this.httpClient.post<{ data: PipelineRoute }>(`${this.baseUrl}`, data);
    }

    delete(id: number) {
        return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
    }

    update(id: number, data: PipelineRoute) {
        return this.httpClient.put<{ data: PipelineRoute }>(`${this.baseUrl}/${id}`, data);
    }


}
