import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FeedbackPoint, PointsService } from '../points/points.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {

  @ViewChild('dragMe') dragMe: any; 
  resizer: any;
  leftSide: any;
  rightSide: any;

  x: number = 0;
  y: number = 0

  leftWidth: number = 0;
  tempEventHandlers: Map<string, (event: Event) => void> = new Map()

  mouseMoveHandler (e: Event) {
    if (e instanceof MouseEvent) {
      // How far the mouse has been moved
      const dx = e.clientX - this.x;
      // const dy = e.clientY - this.y;

      var newLeftWidth = this.leftWidth + dx
      var match = window.getComputedStyle(this.leftSide).getPropertyValue('min-width').match(/\d/)
      if (match) {
        newLeftWidth = Math.max(newLeftWidth, parseInt(match[0]))
      }
      this.leftSide.style.width = `${newLeftWidth}px`;
      document.body.style.cursor = 'col-resize';
      this.leftSide.style.userSelect = 'none';
      this.leftSide.style.pointerEvents = 'none';

      this.rightSide.style.userSelect = 'none';
      this.rightSide.style.pointerEvents = 'none';
    }
  }

  mouseUpHandler () {
    this.resizer.style.removeProperty('cursor');
    document.body.style.removeProperty('cursor');

    this.leftSide.style.removeProperty('user-select');
    this.leftSide.style.removeProperty('pointer-events');

    this.rightSide.style.removeProperty('user-select');
    this.rightSide.style.removeProperty('pointer-events');
    // Remove the handlers of `mousemove` and `mouseup`
    for (var [eventName, handler] of this.tempEventHandlers){
      document.removeEventListener(eventName, handler)
    }
  };


  mouseDownHandler (e: Event) {
    if (e instanceof MouseEvent) {
      // Get the current mouse position
      this.x = e.clientX;
      this.y = e.clientY;
      this.leftWidth = this.leftSide.getBoundingClientRect().width;

      for (var [eventName, handler] of this.tempEventHandlers){
        document.addEventListener(eventName, handler)
      }
    }
}

  setActivePoint(point: FeedbackPoint | null) {
    if (point){
      this.activePoint = point;
      this.createPointView = false;
    } else {
      this.activePoint = {}
    }
  }

  refreshPoint() {
    if (this.activePoint && this.activePoint.id){
      this.pointsservice.getPoint(this.activePoint.id).subscribe(
        (point) => {
          if (point) {
            this.activePoint = point
          }
        }
      )
    }
  }

  setCreatePointView(event: boolean) {
    this.createPointView = event;
    this.activePoint = {}
  }

  activePoint: Partial<FeedbackPoint> = {};
  createPointView: boolean = false;

  constructor(private pointsservice: PointsService) {
    this.tempEventHandlers.set('mousemove', this.mouseMoveHandler.bind(this))
    this.tempEventHandlers.set('mouseup',  this.mouseUpHandler.bind(this))
  }

  ngAfterViewInit(): void {
    this.resizer = this.dragMe.nativeElement
    this.leftSide = this.resizer.previousElementSibling;
    this.rightSide = this.resizer.nextElementSibling;
  }

}
