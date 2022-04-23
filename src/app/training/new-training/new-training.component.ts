import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {   Observable, Subscription } from 'rxjs';
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
  exerciseSubscription!: Subscription;

  constructor(
    private trainingService: TrainingService,
    private db: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.exerciseSubscription = this.trainingService.exercisesChange.subscribe();
    this.trainingService.fetchAvailableExercises();

  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
}
