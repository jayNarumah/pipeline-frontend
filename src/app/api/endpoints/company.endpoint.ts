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

    single(uid: string) {
        return this.httpClient.get<{ data: Company }>(`${this.baseUrl}/${uid}`);
    }

    create(data: Company) {
        return this.httpClient.post<{ data: Company }>(`${this.baseUrl}`, data);
    }

    delete(uid: string) {
        return this.httpClient.delete<void>(`${this.baseUrl}/${uid}`);
    }

    update(uid: string, data: Company) {
        return this.httpClient.patch<{ data: Company }>(`${this.baseUrl}/${uid}`, data);
    }


}
