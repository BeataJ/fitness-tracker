import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {   Observable } from 'rxjs';
import { map } from 'rxjs/operators'

import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';



@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit {
  @Output() trainingStart = new EventEmitter<void>();
  exercises!: Observable<Exercise[]>;

  constructor(
    private trainingService: TrainingService,
    private db: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.exercises = this.db
      .collection('availableExercises')
      .snapshotChanges()
      .pipe(
        map((docArray: { payload: { doc: { id: any; data: () => any; }; }; }[]) => {
          return docArray.map((doc: { payload: { doc: { id: any; data: () => any; }; }; }) => {
            return {

              id: doc.payload.doc.id,
              calories: doc.payload.doc.data().calories,
              name: doc.payload.doc.data().name,
              duration: doc.payload.doc.data().duration,

            };
          });
        })
      )

  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
}
