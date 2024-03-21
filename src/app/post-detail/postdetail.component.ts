import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Subject, finalize, takeUntil } from 'rxjs';

@Component({
  selector: 'app-postdetail',
  templateUrl: './postdetail.component.html',
  styleUrls: ['./postdetail.component.scss']
})
export class PostdetailComponent implements OnInit {

  constructor(
    private apiservice: ApiService,
    private route: ActivatedRoute
  ) { }
  
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  isLoading: boolean = false;

  innerHtmlData1: any;
  innerHtmlData2: any;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) { this.GetHtml(id); }
    });
  }

  GetHtml(id: string) {
    this.isLoading = true;
    this.apiservice.getDetailData(id).pipe(takeUntil(this._unsubscribeAll), finalize(() => { this.isLoading = false; })).subscribe((res: any) => {
      const resData = res?.data?.detaildata;
      if (resData !== null) {
        let parser = new DOMParser();
        parser.parseFromString(resData, 'text/html');
        const tables = parser.parseFromString(res?.data?.detaildata, 'text/html').querySelectorAll('table');
        const tablesHTML = Array.from(tables).map(table => table.outerHTML);
        this.innerHtmlData1 = this.filtteredHtml(this.modifyHtmlContent(tablesHTML[0]));
        this.innerHtmlData2 = this.filtteredHtml(tablesHTML[1]);
      } else {
        this.innerHtmlData1 = null;
        this.innerHtmlData2 = null;
      }
    }, (err) => { this.isLoading = false; });
  }

  modifyHtmlContent(html: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const rows = doc.querySelectorAll('tr');
    rows.forEach(row => {
      const firstTd = row.querySelector('td:first-child');
      if (firstTd) {
        firstTd.classList.add('job-detail');
      }
    });
    return doc.body.innerHTML;
  }

  filtteredHtml(tablesHTML: any): any {
    const excludedStrings = [
      "Android Apps",
      "Mobile Apps",
      "Video Hindi",
      "Join Our Telegram Page",
      "Join Our Telegram Channel",
      "Join Our Channel",
      "Join Sarkari Result Channel",
      "Image Resizer",
      "Other Tools",
      "Join Telegram Page",
      "https://www.sarkariresult.com"
    ];
    return tablesHTML
      .replace(/\n/g, '')
      .replace(/\t/g, '')
      .replace(/<center>/g, '')
      .replace(/<\/center>/g, '')
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<ins\b[^<]*(?:(?!<\/ins>)<[^<]*)*<\/ins>/gi, '')
      .replace(/\s*style="[^"]*"/g, '')
      .replace(/<tr\b[^<]*(?:(?!<\/tr>)<[^<]*)*<\/tr>/gi, (tr: any) => { if (excludedStrings.some(str => tr.includes(str))) { return ''; } return tr; })
      .replace(/<tr\b[^<]*(?:(?!<\/tr>)<[^<]*)*<\/tr>/gi, (tr: any) => { const tdContent = tr.replace(/<td\b[^<]*(?:(?!<\/td>)<[^<]*)*<\/td>/gi, '').trim(); return tdContent === '' ? '' : tr; });
  }

}