import { NgModule } from '@angular/core';

// Login components
import { LoginComponent } from './login.component';
import { loginState } from './login.state';
import { LoginService } from './login.service';

// TODO Does not make any sense, maybe put components in state where they are used?
// Or look for a way to globally provide them
import { LoginComponentsModule } from '../../components/components';

@NgModule({
  imports: [
    LoginComponentsModule
  ],
  declarations: [LoginComponent],
  providers: [LoginService]
})
export class LoginModule {};