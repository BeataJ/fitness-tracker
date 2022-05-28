import { Injectable } from "@angular/core";
import {
  AngularFirestore
} from '@angular/fire/compat/firestore';
import {  Observable, Subject } from "rxjs";
import { map, take } from 'rxjs/operators';
import { Subscription } from "rxjs";

import { Exercise } from "./exercise.model";
import { UIService } from "../shared/ui.service";
import * as fromTraining from './training.reducer';
import * as UI from '../shared/ui.actions';
import * as Training from './training.actions';
import { Store } from "@ngrx/store";

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
    private uiService: UIService,
    private store: Store<fromTraining.State>
    ) {}

  fetchAvailableExercises() {
    this.store.dispatch(new UI.StartLoading())
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

        this.store.dispatch(new UI.StopLoading())
        this.store.dispatch(new Training.SetAvailableTraining(exercises))
      }, error => {
         this.store.dispatch(new UI.StopLoading());
        this.uiService.showSnackbar('Fetching Exercises failed, please try again later', null, 3000);
        this.exercisesChange.next(null);
      }
      ));
  }

  startExercise(selectedId: string) {
    this.store.dispatch(new Training.StartTraining(selectedId));
  }

  completeExercise() {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(
      (ex: any) => {
        this.addDataToDatabase({
          ...ex,
          date: new Date(),
          state: 'completed',
        });
        this.store.dispatch(new Training.StopTraining());
      }
    );

  }

  cancelExercise(progress: number) {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe((ex: any) => {
      this.addDataToDatabase({
        ...ex,
        duration: ex.duration * (progress / 100),
        calories: ex.calories * (progress / 100),
        date: new Date(),
        state: 'completed',
      });
      this.store.dispatch(new Training.StopTraining());
    });
  }


  fetchCompletedOrCancelledExercises() {
    this.fbSubs.push(this.db
      .collection('finishedExercises')
      .valueChanges()
      .subscribe((exercises: any) => {
        this.store.dispatch(new Training.SetFinishedTraining(exercises))
      }
      ));
  }

  cancelSubscription() {
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);
  }
}
