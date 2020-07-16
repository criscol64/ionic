import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Comment } from '../shared/comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.page.html',
  styleUrls: ['./comment.page.scss'],
})
export class CommentPage implements OnInit {

  commentForm: FormGroup;
  comment: Comment;

  constructor(public modalcontroller: ModalController,
    private formBuilder: FormBuilder) {
      this.commentForm = this.formBuilder.group({
        author: ['', Validators.required],
        rating: 5,
        comment: ['', Validators.required],
        date: ''
      });
  }

  ngOnInit() {
  }

  dismiss() {
    this.modalcontroller.dismiss();
  }

  onSubmit() {
    this.comment = this.commentForm.value;
    this.comment.date = new Date().toISOString();
    console.log(this.comment);
    this.modalcontroller.dismiss({comment: this.comment});
  }

}
