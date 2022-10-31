import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { environment } from "environments/environment";

@Injectable({
    providedIn: 'root',
})
export class CountEndpoint {
    baseUrl = `${environment.apiUrl}`;

    constructor(private readonly httpClient: HttpClient) { }
    
    pipelineCount() {
        return this.httpClient.get<number>(`${this.baseUrl}/pipeline-count`);
    }
    pipelineTypeCount() {
        return this.httpClient.get<number>(`${this.baseUrl}/type-count`);
    }
    companyCount() {
        return this.httpClient.get<number>(`${this.baseUrl}/company-count`);
    }
}
