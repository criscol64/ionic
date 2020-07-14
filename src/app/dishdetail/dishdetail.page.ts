import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { Comment } from '../shared/comment';
import { NavController, NavParams, AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.page.html',
  styleUrls: ['./dishdetail.page.scss'],
})
export class DishdetailPage implements OnInit {

  dish: Dish;
  errMess: string;
  avgstars: string;
  numcomments: number;

  constructor(@Inject('BaseURL') private BaseURL,
    private router: Router) {
      console.log(router.getCurrentNavigation());
      //this.dish = router.getCurrentNavigation();
      this.numcomments = this.dish.comments.length;
      let total = 0;
      this.dish.comments.forEach(comment => total += comment.rating );
      this.avgstars = (total/this.numcomments).toFixed(2);
    }

  ngOnInit() {
  }

}
