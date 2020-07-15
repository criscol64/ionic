import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Comment } from '../shared/comment';
import { NavController, NavParams, AlertController, LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.page.html',
  styleUrls: ['./dishdetail.page.scss'],
})
export class DishdetailPage implements OnInit {

  dish: Dish;
  //private dish;
  errMess: string;
  avgstars: string;
  numcomments: number;

  constructor(@Inject('BaseURL') private BaseURL,
    private dishservice: DishService,
    private route: ActivatedRoute) {

    }

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];
    this.dishservice.getDish(id)
      .subscribe(dish => {
        this.dish = dish; this.numcomments = this.dish.comments.length;
        let total = 0;
        this.dish.comments.forEach(comment => total += comment.rating );
        this.avgstars = (total/this.numcomments).toFixed(2);
      });

  }

}
