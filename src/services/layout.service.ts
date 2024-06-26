import {Injectable} from '@angular/core';
import {BaseLayoutService, MenuItem} from "../../../panel/src/services/base-layout.service";

@Injectable()
export class LayoutService extends BaseLayoutService {

  async getMainMenus(): Promise<MenuItem[]> {
    return [
      {
        icon: 'far fa-user-group-simple', text: 'سیستم مدیریت کاربران', children: [
          {text: 'کاربران سیستم', link: `users`, accesses: ['User-Read']},
          {text: 'دسترسی ها', link: `accesses`, accesses: ['Access-Read']},
        ]
      },
    ];
  }

  override async getProfileMenus(): Promise<MenuItem[]> {
    return [
      {icon: 'fal fa-key', text: 'تغییر کلمه عبور', link: `/change-password`},
    ];
  }

}
