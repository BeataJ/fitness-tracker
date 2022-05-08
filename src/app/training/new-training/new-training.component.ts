import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

import {  Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';


import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';



@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})

export class NewTrainingComponent implements OnInit, OnDestroy {
  @Output() trainingStart = new EventEmitter<void>();
  exercises: Exercise[] | null = [];
  private exerciseSubscription!: Subscription;
  private loadingSubscription!: Subscription;
  isLoading = true;

  constructor(
    private trainingService: TrainingService,
    private uiService: UIService
    ) {}

  ngOnInit() {
    this.loadingSubscription = this.uiService.logingStateChanged.subscribe(
      isLoading => {
        this.isLoading = isLoading
      }
    );
    this.exerciseSubscription = this.trainingService.exercisesChange.subscribe(
      (exercises) => {

        this.exercises = exercises
      }
    );
    this.fetchExercises();
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnDestroy(): void {
    if(this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    }

    if(this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }
}
