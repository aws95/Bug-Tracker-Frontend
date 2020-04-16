import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppInitService {
    public dataProject;
    public dataUser;
    public dataTask;
    public dataSprint;
    public dataBug;
    constructor(private http: HttpClient) {
    }

    Init() {

        return new Promise<void>((resolve, reject) => {
            console.log("AppInitService.init() called");
            ////do your initialisation stuff here  
            this.http.get('http://localhost:3000/projects').subscribe(val => {
                console.log(val),
                this.dataProject = val,
                console.log(this.dataProject)
            });
            this.http.get('http://localhost:3000/users').subscribe(val => {
                console.log(val),
                this.dataUser = val,
                console.log(this.dataUser)
            });
            this.http.get('http://localhost:3000/tasks').subscribe(val => {
                console.log(val),
                this.dataTask = val,
                console.log(this.dataTask)
            });
            this.http.get('http://localhost:3000/sprints').subscribe(val => {
                console.log(val),
                this.dataSprint = val,
                console.log(this.dataSprint)
            });
            this.http.get('http://localhost:3000/bugs').subscribe(val => {
                console.log(val),
                this.dataBug = val,
                console.log(this.dataBug)
            });
            setTimeout(() => {
                console.log('AppInitService Finished');
                resolve();
            }, 6000);
        });
    }
    
}
