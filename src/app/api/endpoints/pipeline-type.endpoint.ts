import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { environment } from "environments/environment";
import { PipelineType } from "../models/pipeline-type.model";

@Injectable({
    providedIn: 'root',
})
export class PipelineTypeEndpoint {
    baseUrl = `${environment.apiUrl}/pipeline-type`;


    constructor(private readonly httpClient: HttpClient) { }

    list() {
        return this.httpClient.get<{ data: PipelineType[] }>(`${this.baseUrl}`);
    }

    single(id: number) {
        return this.httpClient.get<{ data: PipelineType }>(`${this.baseUrl}/${id}`);
    }

    create(data: PipelineType) {
        return this.httpClient.post<{ data: PipelineType }>(`${this.baseUrl}`, data);
    }

    delete(id: number) {
        return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
    }

    update(id: number, data: PipelineType) {
        return this.httpClient.put<{ data: PipelineType }>(`${this.baseUrl}/${id}`, data);
    }


}
