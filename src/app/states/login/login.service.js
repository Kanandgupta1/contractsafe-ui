import { Injectable, Inject } from '@angular/core';
import { InjectableClass } from '@fino/lib-injection';
import { HttpService, AppStateService } from '@fino/ng2-common';

@Injectable()
export class LoginService extends InjectableClass {
  constructor(
    @Inject(HttpService) http, 
    @Inject(AppStateService) storage) {
    super({ http, storage })
  }

  login(user) {
    return this.http
      .post('/api/v0/user/login', user)
      .transform((user) => {
        if (user) {
          this.storage.user = user;
          return user;
        }
        return new Error('error.user.none');
      })
      .withErrorMessage()
      .execute();
  }
}