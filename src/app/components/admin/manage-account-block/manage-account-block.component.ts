import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AdminService } from '../../../services/admin/admin.service';

@Component({
  selector: 'app-manage-account-block',
  templateUrl: './manage-account-block.component.html',
  styleUrl: './manage-account-block.component.scss',
})
export class ManageAccountBlockComponent {
  listAccounts: any;
  isVisibleUpdate: boolean = false;
  isAddHrSpinning: boolean = true;

  constructor(
    private adminService: AdminService,
    private msg: NzMessageService
  ) {}

  ngOnInit(): void {
    this.adminService.getAccountByEnabledStatus({ enabled: false }).subscribe(
      (res) => {
        console.log('====================================');
        console.log('res::', res);
        console.log('====================================');
        this.listAccounts = res;
      },
      (err) => {
        console.log('====================================');
        console.log('err');
        console.log('====================================');
      }
    );
  }

  unBlockAccount(data: any) {
    console.log('====================================');
    console.log('data::', data);
    console.log('====================================');
    this.adminService
      .blockAndActiveAccount({
        email: data?.email,
        enabled: true,
      })
      .subscribe(
        (res) => {
          this.msg.success('Unblock Account Successfully !!!');
          this.adminService
            .getAccountByEnabledStatus({ enabled: false })
            .subscribe(
              (res) => {
                console.log('====================================');
                console.log('res::', res);
                console.log('====================================');
                this.listAccounts = res;
              },
              (err) => {
                this.listAccounts = [];
                console.log('====================================');
                console.log('err');
                console.log('====================================');
              }
            );
        },
        (err) => {
          this.listAccounts = [];
          this.msg.error('Unblock Account Error !!!');
        }
      );
  }
}
