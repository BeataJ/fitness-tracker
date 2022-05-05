import { Injectable } from "@angular/core";
import {
  AngularFirestore
} from '@angular/fire/compat/firestore';
import {  Observable, Subject } from "rxjs";
import { map } from 'rxjs/operators';
import { Subscription } from "rxjs";

import { Exercise } from "./exercise.model";
import { UIService } from "../shared/ui.service";

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  exerciseChange = new Subject<Exercise | null>();
  exercisesChange = new Subject<Exercise[] | null>();
  finishedExercisesChange = new Subject<Exercise[]>();
  private availableExercises: Exercise[] = [];
  private runningExercise: Exercise | any = [];
  private fbSubs: Subscription[] = [];

  constructor(
    private db: AngularFirestore,
    private uiService: UIService
    ) {}

  fetchAvailableExercises() {
    this.uiService.logingStateChanged.next(true);
    this.fbSubs.push(this.db
      .collection('availableExercises')
      .snapshotChanges()
      .pipe(
        map(
          (docArray: { payload: { doc: { id: any; data: () => any } } }[]) => {
            // throw(new Error())
            return docArray.map(
              (doc: { payload: { doc: { id: any; data: () => any } } }) => {
                return {
                  id: doc.payload.doc.id,
                  calories: doc.payload.doc.data().calories,
                  name: doc.payload.doc.data().name,
                  duration: doc.payload.doc.data().duration,
                };
              }
            );
          }
        )
      )
      .subscribe((exercises: Exercise[]) => {
        this.uiService.logingStateChanged.next(false)
        this.availableExercises = exercises;
        this.exercisesChange.next([...this.availableExercises]);
      }, error => {
        this.uiService.logingStateChanged.next(false);
        this.uiService.showSnackbar('Fetching Exercises failed, please try again later', null, 3000);
        this.exercisesChange.next(null);
      }
      ));
  }

  startExercise(selectedId: string) {
    // this.db.doc('availableExercises/' + selectedId).update({lastSelected: new Date()});
    this.runningExercise = this.availableExercises.find(
      (ex) => ex.id === selectedId
    );
    this.exerciseChange.next({ ...this.runningExercise });
  }

  completeExercise() {
    this.addDataToDatabase({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed',
    });
    this.runningExercise = null;
    this.exerciseChange.next(null);
  }

  cancelExercise(progress: number) {
    this.addDataToDatabase({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled',
    });
    this.runningExercise = null;
    this.exerciseChange.next(null);
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  fetchCompletedOrCancelledExercises() {
    this.fbSubs.push(this.db
      .collection('finishedExercises')
      .valueChanges()
      .subscribe((exercises: any) =>
        this.finishedExercisesChange.next(exercises)
      ));
  }

  cancelSubscription() {
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);
  }
}
