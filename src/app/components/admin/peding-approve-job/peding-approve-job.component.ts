import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { JobCategoryService } from '../../../services/job-category/job-category.service';
import { JobService } from '../../../services/job/job.service';
import { JobApplicationService } from '../../../services/job-application/job-application.service';
import { StorageService } from '../../../services/storage/storage.service';
import { ProfileService } from '../../../services/profile/profile.service';
import { ACCEPT, PENDING, REJECT } from '../../../../constant';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-peding-approve-job',
  templateUrl: './peding-approve-job.component.html',
  styleUrl: './peding-approve-job.component.scss',
})
export class PedingApproveJobComponent {
  isVisibleAdd = false;
  isVisibleUpdate = false;
  listJob: any = null;
  idUpdate!: number;
  isAddSpinning: boolean = false;
  isUpdateSpinning: boolean = false;
  jobInfo: any;

  constructor(
    private msg: NzMessageService,
    private jobCategoryService: JobCategoryService,
    private jobApply: JobApplicationService,
    private profileService: ProfileService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.jobApply
      .viewJobApplicationByHrEmail(StorageService.getEmail(), PENDING)
      .subscribe(
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
  }

  dowloadCV(email: string) {
    this.profileService.downloadCvByEmail(email).subscribe(
      (res) => {
        this.msg.success('Download CV successfully !!!');
      },
      (error) => {}
    );
  }

  approve(data: any) {
    console.log('====================================');
    console.log('data::', data);
    console.log('====================================');
    const formData = new FormData();
    formData.append('id', String(data.id));
    formData.append('status', ACCEPT);
    this.jobApply.updateJobApplicationByHrEmail(formData).subscribe(
      (res) => {
        this.msg.success('Approve job successfully !!!');

        const formData = new FormData();
        formData.append('Email', data.email)
        formData.append('Content',`Công việc ${data.jobName} đã được duyệt chúng tôi sẽ liên hệ với bạn sớm nhất có thể !!!`)
        this.notificationService
          .sendNotification(formData)
          .subscribe(
            (res) => {},
            (err) => {}
          );
        this.jobApply
          .viewJobApplicationByHrEmail(StorageService.getEmail(), PENDING)
          .subscribe(
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
      },
      (error) => {
        this.msg.error('Approve job failed !!!');
      }
    );
  }

  reject(data: any) {
    const formData = new FormData();
    formData.append('id', String(data.id));
    formData.append('status', REJECT);
    this.jobApply.updateJobApplicationByHrEmail(formData).subscribe(
      (res) => {
        this.msg.success('Reject job successfully !!!');

        const formData = new FormData();
        formData.append('Email', data.email)
        formData.append('Content',`Công việc ${data.jobName} đã bị từ chối vì chúng tôi thấy bạn không phù hợp với vị trí này !!!`)
        this.notificationService
          .sendNotification(formData)
          .subscribe(
            (res) => {},
            (err) => {}
          );
        this.jobApply
          .viewJobApplicationByHrEmail(StorageService.getEmail(), PENDING)
          .subscribe(
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
      },
      (error) => {
        this.msg.error('Reject job failed !!!');
      }
    );
  }
}
