import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private apiservice: ApiService) { }

  jobListData: any;

  ngOnInit(): void {
    this.GetJobList();
  }

  GetJobList() {
    this.apiservice.getJobList().subscribe((res: any) => {
      if (res?.status) {
        this.jobListData = res?.data;
      }
    }, (err) => { });
  }


  GotoDetail(id: string) {

  }


}

