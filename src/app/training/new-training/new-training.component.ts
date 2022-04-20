import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit {
  @Output() trainingStart = new EventEmitter<void>()
  exercises: Exercise[] = [];

  constructor(
    private trainingService: TrainingService,
    private db: AngularFirestore
    ) {}

  ngOnInit(): void {
    this.db.collection('availableExercises').valueChanges().subscribe(res => {
      console.log(res);
    });
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise)
  }
}
