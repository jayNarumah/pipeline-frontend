import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Pipeline } from "../models/pipeline.model";
import { environment } from "environments/environment";

@Injectable({
    providedIn: 'root',
})
export class PipelineEndpoint {
    baseUrl = `${environment.apiUrl}/pipeline`;


    constructor(private readonly httpClient: HttpClient) { }

    list() {
        return this.httpClient.get<{ data: Pipeline[] }>(`${this.baseUrl}`);
    }

    single(id: number) {
        return this.httpClient.get<{ data: Pipeline }>(`${this.baseUrl}/${id}`);
    }

    create(data: Pipeline) {
        return this.httpClient.post<{ data: Pipeline }>(`${this.baseUrl}`, data);
    }

    delete(id: number) {
        return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
    }

    update(id: number, data: Pipeline) {
        return this.httpClient.put<{ data: Pipeline }>(`${this.baseUrl}/${id}`, data);
    }


}
