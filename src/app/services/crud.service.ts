import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CrudService {
  uri = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  get(endPoint) {
    return this.http.get(`${this.uri}/${endPoint}`);
  }
  getById(endPoint, id) {
    return this.http.get(`${this.uri}/${endPoint}/${id}`);
  }
  addProject(endPoint,payload) {
    return this.http.post(`${this.uri}/${endPoint}`,payload);
  }
  addUser(endPoint,payload) {
    return this.http.post(`${this.uri}/${endPoint}`,payload);
  }
  addTask(endPoint,payload) {
    return this.http.post(`${this.uri}/${endPoint}`,payload);
  }
  addBug(endPoint,payload) {
    return this.http.post(`${this.uri}/${endPoint}`,payload);
  }
  addSprint(endPoint,payload) {
    return this.http.post(`${this.uri}/${endPoint}`,payload);
  }
  updateProject(endPoint,id,name) {
    return this.http.patch(`${this.uri}/${endPoint}/${id}`,name);
  }
  updateUser(endPoint,id,password) {
    const payload = {
      password: password
    };
    return this.http.patch(`${this.uri}/${endPoint}/${id}`,payload);
  }
  updateTask(endPoint,id,task) {
    const payload = {
      task: task
    };
    return this.http.patch(`${this.uri}/${endPoint}/${id}`,payload);
  }
  updateBug(endPoint,id,status) {
    const payload = {
      status: status
    };
    return this.http.patch(`${this.uri}/${endPoint}/${id}`,payload);
  }
  updateSprint(endPoint,id,number) {
    const payload = {
      number: number
    };
    return this.http.patch(`${this.uri}/${endPoint}/${id}`,payload);
  }
  delete(endPoint,id) {
    return this.http.delete(`${this.uri}/${endPoint}/${id}`);
  }
}
