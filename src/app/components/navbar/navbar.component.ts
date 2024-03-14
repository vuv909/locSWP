import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MegaMenuItem } from 'primeng/api';
import { StorageService } from '../../services/storage/storage.service';
import { Store } from '@ngrx/store';
import { ProfileService } from '../../services/profile/profile.service';
import { storeUser } from '../../shared/login.action';
import { getUser } from '../../shared/login.selector';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { GetRoleService } from '../../services/get-role.service';
import { AuthService } from '../../services/auth/auth.service';
import { NotificationService } from '../../services/notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  items: MegaMenuItem[] | undefined;
  count: string = '5';
  isLogin: boolean = StorageService.isLoggedIn();
  email: string = StorageService.getEmail();
  profile: any;
  user: any;
  listComment: any;
  intervalId: any;
  displaying: boolean = false;
  totalNumber: string = String(0);

  constructor(
    private router: Router,
    private profileService: ProfileService,
    private store: Store<{ user: any }>,
    private msg: NzMessageService,
    private getRoleService: GetRoleService,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.notificationService
      .totalNotiNotread(StorageService.getEmail())
      .subscribe(
        (res) => {
          this.totalNumber = String(res);
        },
        (err) => {
          console.log('====================================');
          console.log('res::', err);
          console.log('====================================');
        }
      );

    this.notificationService
      .viewNotificationByEmail(StorageService.getEmail())
      .subscribe(
        (res) => {
          console.log('====================================');
          console.log('res::', res);
          console.log('====================================');
          this.listComment = res;
        },
        (err) => {
          console.log('====================================');
          console.log('err::', err);
          console.log('====================================');
        }
      );

    this.store.select(getUser).subscribe((res) => {
      if (res) {
        this.user = res; // Update user directly from the store
        this.updateMenuItems(); // Update menu items when user data changes
      }
    });

    if (this.isLogin && this.email) {
      this.profileService.findAccountByEmail({ email: this.email }).subscribe(
        (res) => {
          this.profileService
            .viewProfileByEmail({ id: res.metadata.id })
            .subscribe(
              (res) => {
                this.store.dispatch(storeUser({ user: res.metadata }));
                this.profile = res.metadata;
                this.updateMenuItems(); // Update menu items when profile data changes
              },
              (error) => {
                this.msg.error('error occured');
              }
            );
        },
        (error) => {
          this.msg.error('error occured');
        }
      );
    }
  }

  updateMenuItems() {
    this.items = [
      {
        label:
          this.user && this.user.avatar
            ? `<img src="data:image/png;base64,${this.user.avatar}" class="w-10 h-10 rounded-full" alt="">`
            : this.profile && this.profile.avatar
            ? `<img src="data:image/png;base64,${this.profile.avatar}" class="w-10 h-10 rounded-full" alt="">`
            : `<img src="assets/images/avatar.png" class="w-10 h-10 rounded-full" alt="">`,
        icon: '',
        items: [
          [
            {
              items: [
                {
                  label: 'Các công việc đã ứng tuyển',
                  routerLink: '/myApplication',
                },
                {
                  label: 'Các công việc yêu thích',
                  routerLink: '/favourite',
                },
                {
                  label: 'Hồ sơ của tôi',
                  routerLink: '/profile',
                },
                {
                  label: 'Đổi mật khẩu',
                  routerLink: '/changeforgotpassword',
                },
                {
                  label: 'Đăng xuất',
                  command: (event) => this.logout(),
                },
              ],
            },
          ],
        ],
      },
    ];
  }

  logout() {
    StorageService.signout();
  }

  about() {
    this.router.navigateByUrl('/about');
  }

  contact() {
    this.router.navigateByUrl('/contact');
  }

  toggle() {
    this.displaying = !this.displaying;
    if (this.displaying === true) {
      this.totalNumber = '';
      this.notificationService
        .updateReadNoti(StorageService.getEmail())
        .subscribe(
          (res) => {
            this.notificationService
              .viewNotificationByEmail(this.email)
              .subscribe(
                (res) => {
                  console.log('====================================');
                  console.log('res::', res);
                  console.log('====================================');
                  this.listComment = res;
                },
                (err) => {
                  this.msg.error('Error occurred while fetching notifications');
                }
              );
          },
          (err) => {}
        );
    }
  }
}
