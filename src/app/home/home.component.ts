import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Subject, finalize, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private apiservice: ApiService) { }
  isLoading: boolean = false;
  jobListData: any;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  
  ngOnInit(): void {
    this.GetJobList();
  }

  GetJobList() {
    this.isLoading = true;
    this.apiservice.getJobList().pipe(takeUntil(this._unsubscribeAll), finalize(() => { this.isLoading = false; })).subscribe((res: any) => {
      if (res?.status) {
        this.jobListData = res?.data;
      }
    }, (err) => { this.isLoading = false; });
  }


  GotoDetail(id: string) {

  }


}

