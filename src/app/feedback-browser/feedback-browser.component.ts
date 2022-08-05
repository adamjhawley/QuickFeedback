import { Component, Input, ViewChild, OnChanges, EventEmitter, Output } from '@angular/core';
import { Feedback, FeedbackPoint, PointsService } from '../points/points.service';
import { environment } from '../../environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-feedback-browser',
  templateUrl: './feedback-browser.component.html',
  styleUrls: ['./feedback-browser.component.css']
})
export class FeedbackBrowserComponent implements OnChanges {

  @Input() activePoint: Partial<FeedbackPoint> = {}
  @Input() createView: boolean = false;
  @Output() refresh = new EventEmitter<Partial<FeedbackPoint>>();

  displayedColumns: string[] = ['feedback', 'timestamp', 'icons'];
  dataSource: MatTableDataSource<Feedback> = new MatTableDataSource<Feedback>();
  @ViewChild(MatPaginator, {static: false}) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }

  getSubmitURL (id: string) {
    return `${environment.baseURL}/submit?id=${id}&owner=${this.activePoint.owner}`
  }

  deleteFeedback(feedback: Feedback) {
    if (this.activePoint && this.activePoint.id) {
      this.pointsservice.deleteFeedback(this.activePoint.id, feedback)
      this.refresh.emit(this.activePoint)
    }
  }

  parseTimeStamp (timestamp: number) {
    return new Date(timestamp).toLocaleDateString()
  }

  refreshFeedback () {
    if (this.activePoint && this.activePoint.id) {
      this.refresh.emit(this.activePoint)
    }
  }

  ngOnChanges() {
    if (this.activePoint){
      if (!this.dataSource) {
        this.dataSource = new MatTableDataSource<Feedback>(this.activePoint.feedback)
      }
      if (this.activePoint.feedback) {
        this.dataSource.data = this.activePoint.feedback
      }
    }
  }

  constructor(private pointsservice: PointsService) {}
}
