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

    single(uid: string) {
        return this.httpClient.get<{ data: PipelineType }>(`${this.baseUrl}/${uid}`);
    }

    create(data: PipelineType) {
        return this.httpClient.post<{ data: PipelineType }>(`${this.baseUrl}`, data);
    }

    delete(uid: string) {
        return this.httpClient.delete<void>(`${this.baseUrl}/${uid}`);
    }

    update(uid: string, data: PipelineType) {
        return this.httpClient.patch<{ data: PipelineType }>(`${this.baseUrl}/${uid}`, data);
    }


}
