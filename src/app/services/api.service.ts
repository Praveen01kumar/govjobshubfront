import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environment/environment';


@Injectable({
    providedIn: 'root'
})
export class ApiService {
    
    BASE_URL: string;

    constructor(private http: HttpClient) {
        this.BASE_URL = environment.API_URL;
    }

    getDetailData(id: string) {
        return this.http.post(this.BASE_URL + 'postdetail/detaildata', { postdata_id: id }).pipe(map((response: any) => {
            return response;
        }),
            catchError((err: any) => {
                return err;
            })
        );
    }

    getJobList() {
        return this.http.get(this.BASE_URL + 'postlist').pipe(map((response: any) => {
            return response;
        }),
            catchError((err: any) => {
                return err;
            })
        );
    }


}
