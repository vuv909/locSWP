import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Observable, from } from 'rxjs';
import { JobService } from '../../../services/job/job.service';
import { JobCategoryService } from '../../../services/job-category/job-category.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  @ViewChild('listJob') listJob: ElementRef | undefined;

  branch: any;
  listCategory: any;
  textSearch: string = '';
  listCategoryLength: number = 0;
  limit: number = 1;
  start: number = 0;
  end: number = 1;
  displayMore: boolean = true;
  displayLess: boolean = true;

  constructor(
    private jobCategoryService: JobCategoryService,
    private msg: NzMessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.jobCategoryService.viewJobCategory().subscribe(
      (res) => {
        this.listCategory = res;
        this.listCategoryLength = res.length;
      },
      (err) => {
        this.msg.error('Error occurred !!!');
      }
    );
    this.jobCategoryService.getAllBranch().subscribe(
      (res) => {
        this.branch = res;
      },
      (err) => {
        this.msg.error('Error occurred !!!');
      }
    );
  }

  search() {
    this.router.navigateByUrl('/search?title=' + this.textSearch.trim());
  }

  branchSearch(id: number) {
    console.log('====================================');
    console.log('id::', id);
    console.log('====================================');
    this.router.navigateByUrl('/search?branchId=' + id);
  }

  categorySearch(id: number) {
    this.router.navigateByUrl('/search?categoryId=' + id);
  }
  
 
}
