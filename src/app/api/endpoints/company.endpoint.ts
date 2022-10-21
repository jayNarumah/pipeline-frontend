import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Company } from "../models/company.model";
import { environment } from "environments/environment";

@Injectable({
    providedIn: 'root',
})
export class CompanyEndpoint {
    baseUrl = `${environment.apiUrl}/company`;


    constructor(private readonly httpClient: HttpClient) { }

    list() {
        return this.httpClient.get<{ data: Company[] }>(`${this.baseUrl}`);
    }

    single(id: number) {
        return this.httpClient.get<{ data: Company }>(`${this.baseUrl}/${id}`);
    }

    create(data: Company) {
        return this.httpClient.post<{ data: Company }>(`${this.baseUrl}`, data);
    }

    delete(id: number) {
        return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
    }

    update(id: number, data: Company) {
        return this.httpClient.put<{ data: Company }>(`${this.baseUrl}/${id}`, data);
    }


}
