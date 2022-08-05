import { Component, Inject, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { FeedbackPoint, PointsService } from '../points/points.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-point-table',
  templateUrl: './point-table.component.html',
  styleUrls: ['./point-table.component.css']
})
export class PointTableComponent implements OnInit {

  @Output() newPoint = new EventEmitter<FeedbackPoint>();
  @Output() createPointView = new EventEmitter<boolean>();
  @Output() clearPoint = new EventEmitter();

  displayedColumns: string[] = ['name', 'icons'];
  dataSource: MatTableDataSource<FeedbackPoint> = new MatTableDataSource<FeedbackPoint>();
  activePoint: FeedbackPoint | null = null

  addPoint () {
    this.activePoint = null;
    this.createPointView.emit(true);
  }

  constructor(private pointsService: PointsService, public dialog: MatDialog) { 
  }

  deletePoint (point: FeedbackPoint, event: Event) {
    const dialogRef = this.dialog.open(DeleteWarningDialog, { data: this.activePoint })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.pointsService.deletePoint(point.id)
        this.activePoint = null
        this.clearPoint.emit()
      }
    })

    event.stopPropagation()
  }

  ngOnInit(): void {
    this.pointsService.points$.subscribe({
      next: (v) => {this.dataSource.data = v}
    })
  }


}

@Component({
  selector: 'delete-warning-dialog',
  templateUrl: 'delete-warning-dialog.component.html',
})
export class DeleteWarningDialog {
  constructor(
    public dialogRef: MatDialogRef<DeleteWarningDialog>,
    @Inject(MAT_DIALOG_DATA) public data: FeedbackPoint,
  ) {}
}