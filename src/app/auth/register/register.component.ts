import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  constructor( private authservice: AuthService) { }

  ngOnInit(): void {
  }
  registerfun(reg : User) {
    this.authservice.register(reg.email , reg.password)
    console.log(reg)
  }
}
