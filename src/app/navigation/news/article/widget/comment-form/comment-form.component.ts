import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from '../../../../../shared/services/comment.service';
import { ReloadRouterService } from '../../../../../shared/services/miscellaneous/reload-router.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit {

  commentForm: FormGroup;
  submitted = false;
  id: number

  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute,
              private reloadRouter: ReloadRouterService, private commentService: CommentService,
              private viewScroller: ViewportScroller) {
  }

  ngOnInit() {
    this.commentForm = this.formBuilder.group({
      title: ['',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50)
        ]
      ],
      message: ['', Validators.required],
    });
  }

  addComment() {
    this.submitted = true;
    this.id = this.activatedRoute.snapshot.params.id;

    if (this.commentForm.invalid) {
      return;
    } else {
      const payload = {
        title: this.commentForm.controls.title.value,
        message: this.commentForm.controls.message.value,
      };

      // console.log(payload);
      // console.log(this.id)

       this.commentService.store(this.id, payload)
       .subscribe(
       () => {
         // reload component without refreshing the page | asynchronous
         this.reloadRouter.navigate(['/news/article/', this.id]).finally(() => {
           this.viewScroller.setOffset([120, 120]);
           this.viewScroller.scrollToAnchor('comments'); // Anchor Link
         });
       },
       (err) => {
            console.log(err);
          });
    }
  }

}
