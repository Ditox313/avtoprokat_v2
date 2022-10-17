import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MaterialService } from 'src/app/shared/services/material.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  currentUser!: any;
  form!: FormGroup; 

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.minLength(6),
      ]),
      name: new FormControl(null, [Validators.required]),
      secondName: new FormControl(null, [Validators.required]),
      thirdName: new FormControl(null, [Validators.required]),
      doverenost: new FormControl(null, [Validators.required]),
    });

    

    this.auth.get_user().subscribe(user => {
      this.currentUser = user;

        this.form.patchValue({
          email: user.email,
          name: user.name,
          secondName: user.secondName,
          thirdName: user.thirdName,
          doverenost: user.doverenost,
      });
    })

    MaterialService.updateTextInputs();
    

    
  }

  onSubmitProfile() {
    const user = {
      name: this.form.value.name,
      secondName: this.form.value.secondName,
      thirdName: this.form.value.thirdName,
      email: this.form.value.email,
      password: this.form.value.password,
      doverenost: this.form.value.doverenost,
    };

    this.auth.update(user).subscribe((res) => {
        this.form.patchValue({
          email: res.email,
          secondName: res.secondName,
          thirdName: res.thirdName,
        });

        MaterialService.toast('Данные изменены');
    });
  }

}
