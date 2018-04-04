import { Component, OnChanges } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnChanges {

  form: FormGroup;
  tasks: Object[];

  constructor(private formBuilder: FormBuilder, private taskService: TaskService) {
    this.createForm();
  }

  ngOnChanges () {
    this.loadTasks();
  }

  createForm() {
    this.form = this.formBuilder.group({
      description: ['', Validators.required]
    });
  }

  loadTasks() {
    this.taskService.getByUser().subscribe(data => {
      this.tasks = data;
    });
  }

  saveTask() {
    this.taskService.save(this.form.value)
      .subscribe(data => {
        console.log(data);
        this.form.reset({
          description: ''
        });
        this.loadTasks();
      });
  }

  deleteTask(taskID: String) {
    this.taskService.delete(taskID)
      .subscribe(data => {
        this.loadTasks();
        console.log(data);
      });
  }

}
