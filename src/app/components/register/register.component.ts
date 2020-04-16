import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
interface Role {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userRole: any;
  roles: Role[] = [
    { value: 'admin', viewValue: 'Admin' },
    { value: 'project-manager', viewValue: 'Project Manager' },
    { value: 'developer', viewValue: 'Developer' }
  ];
  constructor() { }

  ngOnInit(): void {

  }
  changeRole(value) {
    this.userRole = value;
    console.log(this.userRole)
  }
  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  submit() {
      console.log(this.form.value,this.userRole);
  }
}
