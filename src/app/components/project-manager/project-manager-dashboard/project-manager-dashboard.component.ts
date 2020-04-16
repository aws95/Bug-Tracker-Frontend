import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CrudService } from '../../../services/crud.service';
import { AppInitService } from '../../../services/app-init.service';


interface Role {
  value: string;
  viewValue: string;
}
export interface Assignment {
  assignment: string;
}
export interface Project {
  project: string;
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
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-project-manager-dashboard',
  templateUrl: './project-manager-dashboard.component.html',
  styleUrls: ['./project-manager-dashboard.component.css']
})
export class ProjectManagerDashboardComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  ELEMENT_DATA: PeriodicElement[] = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
    { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
    { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
    { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
    { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
    { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
    { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
    { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
    { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
    { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
    { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  //////////////////////////////////////////////
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
  selectedProject = new FormControl();
  selectedSprint = new FormControl();
  projectId: any;
  sprints = [];
  taskSprints = [];
  addTaskTableData = [];
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
  taskProject: any;
  taskProjectId = new FormControl();
  taskSprint = new FormControl();
  assignTaskP: any;
  assignTaskPId: any;
  assignSprints = [];
  assignTaskS: any;
  assignTaskTableData: any;
  tester: any;
  //////////////////////////////////////////////
  constructor(private api: CrudService, private dataInit: AppInitService) {
    this.projects = this.dataInit.dataProject;
    this.userData = this.dataInit.dataUser;
    this.taskData = this.dataInit.dataTask;
    this.bugData = this.dataInit.dataBug;
    this.sprintData = this.dataInit.dataSprint;
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  changeRole(value) {
    this.userRole = value;
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
  changeProject(value) {
    this.selectedProject = value;
    this.projects.filter(object => {
      if (object.projectName === this.selectedProject) {
        this.projectId = object._id
      }
    })
    this.sprintData.filter(object => {
      if (object.project === this.projectId) {
        console.log(object.number);
        this.sprints.push(object.number)
      }
      console.log(this.sprints);
    })
  }
  ///////////////////////////////////////////////
  changeSprint(value) {
    this.selectedSprint = value;
    console.log(typeof this.selectedSprint);
  }
  ///////////////////////////////////////////////
  changeAddTaskProject(value) {
    this.taskProject = value;
    this.projects.filter(object => {
      if (object.projectName === this.taskProject) {
        this.taskProjectId = object._id
      }
    })
    this.sprintData.filter(object => {
      if (object.project === this.taskProjectId) {
        console.log(object.number);
        this.taskSprints.push(object.number)
      }
      console.log(this.taskSprints);
    })
  }
  ///////////////////////////////////////////////
  changeAddTaskSprint(value) {
    this.taskSprint = value;
    this.taskData.filter(object => {
      if ((object.project === this.taskProjectId) && (object.sprint === this.taskSprint)) {
        this.addTaskTableData.push(object);
      }
    })
    console.log(this.addTaskTableData);
  }
  ///////////////////////////////////////////////
  changeAssignTaskProject(value) {
    this.assignTaskP = value;
    this.projects.filter(object => {
      if (object.projectName === this.assignTaskP) {
        this.assignTaskPId = object._id
      }
    })
    this.sprintData.filter(object => {
      if (object.project === this.assignTaskPId) {
        console.log(object.number);
        this.assignSprints.push(object.number)
      }
      console.log(this.assignSprints);
    })
  }
  ///////////////////////////////////////////////
  changeAssignTaskSprint(value) {
    this.assignTaskS = value;
    this.taskData.filter(object => {
      if ((object.project === this.assignTaskPId) && (object.sprint === this.assignTaskS)) {
        this.assignTaskTableData.push(object);
      }
    })
    console.log(this.assignTaskTableData);
  }
  ///////////////////////////////////////////////
  changeTester(value) {
    this.tester = value;
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
    console.log(this.te, this.se, this.st);
  }
  ///////////////////////////////////////////////
  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  submit() {
    console.log(this.form.value);
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
    sprintNum: new FormControl(''),
    goals: new FormControl(''),
    comments: new FormControl('')
  });
  submitProject(toInput1, toInput2) {
    let payload = {
      project: this.projectId,
      number: this.formProject.value.sprintNum,
      goals: this.formProject.value.goals,
      comments: this.formProject.value.comments,
      startDate: this.events1[0],
      finishDate: this.events2[0]
    }
    console.log(payload);
    this.api.addSprint('sprints', payload).subscribe((data) => console.log(data));
    this.api.updateProject('projects', this.projectId, this.formProject.value.sprintNum).subscribe((data) => console.log(data));
    this.formProject.reset();
    this.selectedProject = new FormControl('');
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
    this.api.addBug('bugs', payload).subscribe((data) => console.log(data))
    this.formBug.reset();
    this.bugTypeCtrl = new FormControl('');
    this.severityCtrl = new FormControl('');
    this.statusCtrl = new FormControl('');
  }
  //////////////////////////////////////////////////
  formTask: FormGroup = new FormGroup({
    task: new FormControl(''),
    days: new FormControl('')
  });
  submitTask() {
    let payload = {
      project: this.taskProjectId,
      sprint: this.taskSprint,
      task: this.formTask.value.task,
      days: this.formTask.value.days
    }
    console.log(this.formTask.value);
    this.api.addTask('tasks', payload).subscribe((data) => console.log(data));
    this.formTask.reset();
    this.taskProject = new FormControl('');
    this.taskSprint = new FormControl('');
    this.addTaskTableData = [];
  }
  //////////////////////////////////////////////////
  formAssign: FormGroup = new FormGroup({
    task: new FormControl(''),
    days: new FormControl('')
  });
  submitAssign() {
    let payload = {
      project: this.taskProjectId,
      sprint: this.taskSprint,
      task: this.formTask.value.task,
      days: this.formTask.value.days
    }
    console.log(this.formTask.value);
    this.api.addTask('tasks', payload).subscribe((data) => console.log(data));
    this.formTask.reset();
    this.taskProject = new FormControl('');
    this.taskSprint = new FormControl('');
    this.addTaskTableData = [];
  }
}
