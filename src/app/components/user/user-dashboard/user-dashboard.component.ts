import { Component, OnInit , ViewChild} from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

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
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  ELEMENT_DATA: PeriodicElement[] = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
    {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
    {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
    {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
    {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
    {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
    {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
    {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
    {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
    {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
    {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  
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

  assignements: Assignment[] = [
    {
      assignment: 'Arkansas',
    },
    {
      assignment: 'California',
    },
    {
      assignment: 'Florida',
    },
    {
      assignment: 'Texas',
    }
  ];
///////////////////////////////////////
  projectCtrl = new FormControl('');
  filteredProjects: Observable<Project[]>;

  projects: Project[] = [
    {
      project: 'Project a',
    },
    {
      project: 'Project b',
    },
    {
      project: 'Project c',
    },
    {
      project: 'Project d',
    }
  ];
  /////////////////////////////////////////
  userCtrl = new FormControl();
  filteredUsers: Observable<User[]>;

  users: User[] = [
    {
      user: 'Arkansas',
    },
    {
      user: 'California',
    },
    {
      user: 'Florida',
    },
    {
      user: 'Texas',
    }
  ];
  /////////////////////////////////////////
  bugTypeCtrl = new FormControl();
  filteredBugTypes: Observable<BugType[]>;

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
  filteredSeverities: Observable<Severity[]>;

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
  filteredStatuses: Observable<Status[]>;

  statuses: Status[] = [
    {
      status: 'Initial',
    },
    {
      status: 'CheckedIn',
    },
    {
      status: 'In ',
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
  testerCtrl = new FormControl();
  filteredTesters: Observable<Tester[]>;

  testers: Tester[] = [
    {
      tester: 'Arkansas',
    },
    {
      tester: 'California',
    },
    {
      tester: 'Florida',
    },
    {
      tester: 'Texas',
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
//////////////////////////////////////////////
  chip: any;
  tasksVisible: boolean = true;
  reportsVisible: boolean = false;
  constructor() { 
    this.filteredAssignements = this.assignementCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this._filterStates(state) : this.assignements.slice())
      );
      /////////////////////////////////////////////////////
      this.filteredProjects = this.projectCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this._filterProjects(state) : this.projects.slice())
      );
      //////////////////////////////////////////////////////
      this.filteredUsers = this.userCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this._filterUsers(state) : this.users.slice())
      );
      //////////////////////////////////////////////////////
      this.filteredBugTypes = this.bugTypeCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this._filteredBugTypes(state) : this.bugTypes.slice())
      );
      //////////////////////////////////////////////////////
      this.filteredSeverities = this.severityCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this._filteredSeverities(state) : this.serverities.slice())
      );
      //////////////////////////////////////////////////////
      this.filteredTesters = this.testerCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this._filteredTesters(state) : this.testers.slice())
      );
      //////////////////////////////////////////////////////
      this.filteredStatuses = this.statusCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this._filteredStatuses(state) : this.statuses.slice())
      );
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  
  private _filterStates(value: string): Assignment[] {
    const filterValue = value.toLowerCase();

    return this.assignements.filter(state => state.assignment.toLowerCase().indexOf(filterValue) === 0);
  }
  /////////////////////////////////////////////////
  private _filterProjects(value: string): Project[] {
    const filterValue = value.toLowerCase();

    return this.projects.filter(state => state.project.toLowerCase().indexOf(filterValue) === 0);
  }
  ////////////////////////////////
  private _filterUsers(value: string): User[] {
    const filterValue = value.toLowerCase();

    return this.users.filter(state => state.user.toLowerCase().indexOf(filterValue) === 0);
  }
  ///////////////////////////////
  private _filteredBugTypes(value: string): BugType[] {
    const filterValue = value.toLowerCase();

    return this.bugTypes.filter(state => state.bugType.toLowerCase().indexOf(filterValue) === 0);
  }
  ///////////////////////////////
  private _filteredSeverities(value: string): Severity[] {
    const filterValue = value.toLowerCase();

    return this.serverities.filter(state => state.severity.toLowerCase().indexOf(filterValue) === 0);
  }
  ///////////////////////////////
  private _filteredStatuses(value: string): Status[] {
    const filterValue = value.toLowerCase();

    return this.statuses.filter(state => state.status.toLowerCase().indexOf(filterValue) === 0);
  }
  ///////////////////////////////
  private _filteredTesters(value: string): Tester[] {
    const filterValue = value.toLowerCase();

    return this.testers.filter(state => state.tester.toLowerCase().indexOf(filterValue) === 0);
  }
  ///////////////////////////////
  handleClick(event: Event) {
    this.chip = event.target as HTMLButtonElement;
    console.log(this.chip.id);
    if (this.chip.id === "tasks") {
      console.log(!this.tasksVisible);
      this.tasksVisible = true;
      this.reportsVisible = false;
    }
    else {
      console.log(!this.reportsVisible);
      this.reportsVisible = true;
      this.tasksVisible = false;
    }
  }
  changeRole(value) {
    this.userRole = value;
    console.log(this.userRole)
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
    email: new FormControl(''),
    password: new FormControl('')
  });
  submitUser() {
    console.log(this.formUser.value,this.userRole);
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
  submitProject() {
    console.log(this.formProject.value,this.events1,this.events2);
  }
  //////////////////////////////////////////////////
  formBug: FormGroup = new FormGroup({
    initiator: new FormControl(''),
    bugRef: new FormControl('')
  });
  submitBug() {
    console.log(this.formUser.value);
  }
  //////////////////////////////////////////////////
  formTask: FormGroup = new FormGroup({
    initiator: new FormControl(''),
    bugRef: new FormControl('')
  });
  submitTask() {
    console.log(this.formUser.value);
  }
}
