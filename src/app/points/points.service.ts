import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AuthService } from '../auth.service';
import firebase from 'firebase/compat/app';
import { AngularFireAnalytics } from '@angular/fire/compat/analytics';


export class Feedback {
  constructor(public text: string, public author: string, public timestamp: number){}
}

export class FeedbackPoint {
  constructor(
    public name: string,
    public owner: string,
    public id: string,
    public feedback: Array<Feedback>,
    public prompt: string) {}
}

@Injectable({
  providedIn: 'root'
})
export class PointsService {

  public points$!: Observable<FeedbackPoint[]>
  private collection!: AngularFirestoreCollection<FeedbackPoint>
  private userID!: string

  constructor (private authService: AuthService, private firestore: AngularFirestore, private analytics: AngularFireAnalytics) {
    this.authService.getUser().then(user => this.setUser(user))
    this.authService.user$.subscribe(user => this.setUser(user))
  }

  setUser (user: firebase.User | null) {
    if (user) {
      this.setCollection(user.uid)
      this.userID = user.uid
    }
  }

  setCollection (ownerID: string) {
    const userCollection = this.firestore.collection<firebase.User>('users')
    const userDoc = userCollection.doc(ownerID)
    this.collection = userDoc.collection<FeedbackPoint>('points')
    this.points$ = this.collection.valueChanges();
  }

  /**
   * Add 'point' to the database. Overwrites 'id' as the auto-generated ID.
   * @param point 'FeedbackPoint' instance to add to the database.
   */
  async addPoint (point: FeedbackPoint) {
    const docRef = await this.collection.add(Object.assign({}, point))
    await docRef.update({id: docRef.id})
    this.analytics.logEvent("added_point", {id: docRef.id, owner: this.userID})
  }

  getPoint (id: string) {
    return this.collection.doc(id).valueChanges()
  }

  async addFeedback (id: string, feedback: Feedback) {
    const pointRef = this.collection.doc(id)
    pointRef.get().subscribe((doc) => {
      const point = doc.data()
      if (point != undefined){
        point.feedback.push(feedback)
        const feedbackObjs = point.feedback.map((fb) => Object.assign({}, fb))
        pointRef.update({feedback: feedbackObjs})
      this.analytics.logEvent("added_feedback", {id: point.id})
      }
    })
  }

  deleteFeedback (id: string, feedback: Feedback) {
    const pointRef = this.collection.doc(id)
    pointRef.get().subscribe((doc) => {
      const point = doc.data()
      if (!point) {
        return
      }
      // TODO: change to map
      point.feedback.forEach((fb, idx) => {
        if (fb.text == feedback.text && fb.author == feedback.author && fb.timestamp == feedback.timestamp) {
          point.feedback.splice(idx, 1)
          pointRef.set(point)
        }
      })
    })
  }

  deletePoint (id: string) {
    const pointRef = this.collection.doc(id)
    pointRef.delete()
  }
}
