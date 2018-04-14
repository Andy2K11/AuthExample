import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UserService } from './user.service';
import { User } from './user.model';

@Component({
  selector: 'ln-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'ln';
    username;

    constructor(private userService: UserService) {}

    onSubmit(form: NgForm) {
        const user = new User(
            form.value.email,
            form.value.password,
            null
        );
        this.userService.login(user)
            .subscribe(
                data => {
                    this.username = data.body.username;
                },
                error => console.error(error)
            );
            form.reset();
    }

    onTest() {
        this.userService.test()
            .subscribe (
                data => console.log(data),
                error => console.error(error)
            );
    }

    onAdmin() {
        this.userService.admin()
            .subscribe (
                data => console.log(data),
                error => console.error(error)
            );
    }
}
