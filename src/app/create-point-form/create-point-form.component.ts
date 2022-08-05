import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { FeedbackPoint, PointsService } from '../points/points.service';

@Component({
  selector: 'app-create-point-form',
  templateUrl: './create-point-form.component.html',
  styleUrls: ['./create-point-form.component.css']
})
export class CreatePointFormComponent implements OnInit {

  point: FeedbackPoint = {name: '', owner: 'anon', id:'0000', feedback: [], prompt: ''}

  async onSubmit(form: NgForm) {
    this.point.owner = await this.authService.getUser().then((user) => {
      if (user) {
        return user.uid
      }
      else {
        throw Error("User not signed in.")
      }
    })
    this.pointsService.addPoint(Object.assign({}, this.point))
    form.resetForm()
  }

  constructor(private pointsService: PointsService, private authService: AuthService) { }

  ngOnInit(): void {
  }

}
