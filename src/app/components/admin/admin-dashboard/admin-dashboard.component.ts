import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { CrudService } from '../../../services/crud.service';
import { AppInitService } from '../../../services/app-init.service';


interface Role {
  value: string;
  viewValue: string;
}
export interface Assignment {
  assignment: string;
}
export interface User {
  user: string;
}
export interface BugType {
  bugType: string;
}
export interface Severity {
  severity: string;
}
export interface Status {
  status: string;
}
export interface Tester {
  tester: string;
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = ['Apple', 'Banana', 'Kiwifruit', 'Blueberry', 'Orange', 'Grapes'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [45, 37, 60, 70, 46, 33], label: 'Best Fruits' }
  ];

  ////////////////////////////////////////
  events1: string[] = [];
  events2: string[] = [];
  //////////////////////////////////////////
  assignementCtrl = new FormControl();
  filteredAssignements: Observable<Assignment[]>;
  ///////////////////////////////////////
  projectCtrl = new FormControl('');
  projects: any;
  /////////////////////////////////////////
  userCtrl = new FormControl();
  filteredUsers: Observable<User[]>;
  /////////////////////////////////////////
  bugTypeCtrl = new FormControl();
  bugTypes: BugType[] = [
    {
      bugType: 'Functionality Errors',
    },
    {
      bugType: 'Communication Errors',
    },
    {
      bugType: 'Missing commands',
    },
    {
      bugType: 'Syntactic bugs',
    }
    ,
    {
      bugType: 'Improper handling of the errors',
    }
    ,
    {
      bugType: 'Calculation bugs',
    }
    ,
    {
      bugType: 'Control flow bugs',
    }
  ];
  /////////////////////////////////////////
  severityCtrl = new FormControl();
  serverities: Severity[] = [
    {
      severity: 'Critical',
    },
    {
      severity: 'Minor',
    },
    {
      severity: 'Major',
    },
    {
      severity: 'Trivial',
    }
  ];
  /////////////////////////////////////////
  statusCtrl = new FormControl();
  statuses: Status[] = [
    {
      status: 'Initial',
    },
    {
      status: 'CheckedIn',
    },
    {
      status: 'CheckedOut',
    }
    ,
    {
      status: 'Under Review',
    }
    ,
    {
      status: 'Released',
    }
  ];
  /////////////////////////////////////////
  userRole = new FormControl();
  roles: Role[] = [
    { value: 'admin', viewValue: 'Admin' },
    { value: 'project-manager', viewValue: 'Project Manager' },
    { value: 'developer', viewValue: 'Developer' },
    { value: 'tester', viewValue: 'Tester' }
  ];
  userData: any;
  taskData: any;
  bugData: any;
  sprintData: any;
  projectStatusP: any;
  projectStatusS: any;
  userStatusU: any;
  userStatusP: any;
  userStatusS: any;
  projectStatusPId: any;
  projectStatusSpr: string[] = [];
  userStatusPId: any;
  userStatusSpr: string[] = [];
  catchBug: any;
  showBugData: any;
  se: any;
  st: any;
  te: any;
  //////////////////////////////////////////////
  constructor(private api: CrudService, private dataInit: AppInitService) {
    this.projects = this.dataInit.dataProject;
    this.userData = this.dataInit.dataUser;
    this.taskData = this.dataInit.dataTask;
    this.bugData = this.dataInit.dataBug;
    this.sprintData = this.dataInit.dataSprint;
  }

  ngOnInit(): void {
  }
  changeRole(value) {
    return this.userRole = value;
    console.log(this.userRole)
  }
  ///////////////////////////////////////////////
  changeType(value) {
    this.bugTypeCtrl = value;
    console.log(this.bugTypeCtrl)
  }
  ///////////////////////////////////////////////
  changeSeverity(value) {
    this.severityCtrl = value;
    console.log(this.severityCtrl)
  }
  ///////////////////////////////////////////////
  changeStatus(value) {
    this.statusCtrl = value;
    console.log(this.statusCtrl)
  }
  ///////////////////////////////////////////////
  projectStatusProject(value) {
    this.projectStatusP = value;
    this.projects.filter(object => {
      if (object.projectName === this.projectStatusP) {
        this.projectStatusPId = object._id
      }
      console.log(this.projectStatusPId);
    })
    this.sprintData.filter(object => {
      if (object.project === this.projectStatusPId) {
        console.log(object);
        this.projectStatusSpr.push(object.number)
      }
    })
    console.log(this.projectStatusSpr);
  }
  ///////////////////////////////////////////////
  projectStatusSprint(value) {
    this.projectStatusS = value;
  }
  ///////////////////////////////////////////////
  userStatusUser(value) {
    this.userStatusU = value;
  }
  ///////////////////////////////////////////////
  userStatusProject(value) {
    this.userStatusP = value;
    this.projects.filter(object => {
      if (object.projectName === this.userStatusP) {
        this.userStatusPId = object._id
      }
      console.log(this.userStatusPId);
    })
    this.sprintData.filter(object => {
      if (object.project === this.userStatusPId) {
        console.log(object);
        this.userStatusSpr.push(object.number)
      }
    })
    console.log(this.userStatusSpr);
  }
  ///////////////////////////////////////////////
  userStatusSprint(value) {
    this.userStatusS = value;
  }
  ///////////////////////////////////////////////
  catchBugRef(value) {
    this.catchBug = value;
    this.bugData.filter(object => {
      if (object.ref === this.catchBug) {
        this.showBugData = object
      }
      console.log(this.showBugData);
    })
    this.te = this.showBugData.tester;
    this.se = this.showBugData.severity;
    this.st = this.showBugData.status;
    console.log(this.te,this.se,this.st);
  }
  ///////////////////////////////////////////////
  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
  submit() {
    console.log(this.form.value);
  }
  ////////////////////////////////////////////
  formUser: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  });
  submitUser() {
    let payload = {
      name: this.formUser.value.name,
      email: this.formUser.value.email,
      password: this.formUser.value.password,
      role: this.userRole
    }
    console.log(payload);
    this.api.addUser('users', payload).subscribe((data) => console.log(data));
    this.formUser.reset();
    this.userRole = new FormControl('');
  }
  ////////////////////////////////////////////////////
  addEvent1(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events1.push(`${type}: ${event.value}`);
    console.log(this.events1)
  }
  addEvent2(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events2.push(`${type}: ${event.value}`);
    console.log(this.events2)
  }
  formProject: FormGroup = new FormGroup({
    projectName: new FormControl(''),
    client: new FormControl(''),
    description: new FormControl(''),
    comments: new FormControl('')
  });
  submitProject(toInput1, toInput2) {
    let info = {
      projectName: this.formProject.value.projectName,
      client: this.formProject.value.client,
      description: this.formProject.value.description,
      comments: this.formProject.value.comments,
      deadline: this.events1[0],
      issueDate: this.events2[0]
    }
    console.log(info);
    this.api.addProject('projects', info).subscribe((data) => console.log(data));
    this.formProject.reset();
    toInput1.value = '';
    toInput2.value = '';
  }
  //////////////////////////////////////////////////
  formBug: FormGroup = new FormGroup({
    initiator: new FormControl(''),
    tester: new FormControl(''),
    bugRef: new FormControl('')
  });
  submitBug() {
    let payload = {
      ref: this.formBug.value.bugRef,
      initiator: this.formBug.value.initiator,
      tester: this.formBug.value.tester,
      type: this.bugTypeCtrl,
      severity: this.severityCtrl,
      status: this.statusCtrl
    }
    console.log(payload);
    this.api.addBug('bugs', payload).subscribe((data) => console.log(data));
    this.formBug.reset();
    this.bugTypeCtrl = new FormControl('');
    this.severityCtrl = new FormControl('');
    this.statusCtrl = new FormControl('');
  }
  //////////////////////////////////////////////////
}
