import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { JobCategoryService } from '../../services/job-category/job-category.service';
import { JobService } from '../../services/job/job.service';
import { formatDate } from '@angular/common';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-viewjob-admin',
  templateUrl: './viewjob-admin.component.html',
  styleUrl: './viewjob-admin.component.scss',
})
export class ViewjobAdminComponent {
  isVisibleAdd = false;
  isVisibleUpdate = false;
  listJob: any = null;
  idUpdate!: number;
  isAddSpinning: boolean = false;
  isUpdateSpinning: boolean = false;
  jobInfo: any;
  updateForm!: FormGroup;
  listJobCategory: any = null;
  branchList: any = null;

  constructor(
    private msg: NzMessageService,
    private jobCategoryService: JobCategoryService,
    private jobService: JobService
  ) {}

  ngOnInit(): void {
    this.jobService.getAllJob().subscribe(
      (res) => {
        this.listJob = res;
      },
      (error) => {
        if (error?.error?.error) {
          this.msg.error(error?.error?.error, { nzDuration: 2000 });
        } else {
          this.msg.error('Error occured', { nzDuration: 2000 });
        }
      }
    );
    this.jobCategoryService.viewJobCategory().subscribe(
      (res) => {
        this.listJobCategory = res;
      },
      (error) => {
        if (error?.error?.error) {
          this.msg.error(error?.error?.error, { nzDuration: 2000 });
        } else {
          this.msg.error('Error occured', { nzDuration: 2000 });
        }
      }
    );
    this.jobCategoryService.getAllBranch().subscribe(
      (res) => {
        this.branchList = res;
      },
      (error) => {
        if (error?.error?.error) {
          this.msg.error(error?.error?.error, { nzDuration: 2000 });
        } else {
          this.msg.error('Error occured', { nzDuration: 2000 });
        }
      }
    );
  }
}
