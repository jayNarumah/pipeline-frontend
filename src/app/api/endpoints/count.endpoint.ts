import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { environment } from "environments/environment";

@Injectable({
    providedIn: 'root',
})
export class CountEndpoint {
    baseUrl = `${environment.apiUrl}/statistic`;

    constructor(private readonly httpClient: HttpClient) { }

    pipelineCount() {
        return this.httpClient.get<number>(`${this.baseUrl}/pipelines`);
    }
    pipelineTypeCount() {
        return this.httpClient.get<number>(`${this.baseUrl}/pipeline-types`);
    }
    companyCount() {
        return this.httpClient.get<number>(`${this.baseUrl}/companies`);
    }
}
