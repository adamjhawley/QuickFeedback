import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Feedback, FeedbackPoint, PointsService } from '../points/points.service';
import { NgForm, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && (control.invalid && control.touched));
  }
}

@Component({
  selector: 'app-submit-feeback',
  templateUrl: './submit-feeback.component.html',
  styleUrls: ['./submit-feeback.component.css']
})
export class SubmitFeebackComponent implements OnInit {

  public formID: string = ''
  _point: FeedbackPoint | undefined = undefined
  answer = new FormControl('', Validators.required)
  matcher = new MyErrorStateMatcher()

  constructor(private route: ActivatedRoute, private pointsService: PointsService) { }

  async onSubmit () {
    if (this._point) {
      if (this.answer.value){
        const feedback = new Feedback(this.answer.value, 'Anon', Date.now())
        await this.pointsService.addFeedback(this._point.id, feedback)
        await this.answer.reset()
        await this.answer.markAsPristine()
      }
    }
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.pointsService.setCollection(params['owner'])
      this.formID = params['id'];
      this.pointsService.getPoint(this.formID).subscribe(point => this._point = point)
    })
  }

}
