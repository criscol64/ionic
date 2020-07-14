import { Component, OnInit, Inject } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from '@ionic/angular';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { DishdetailPage } from '../dishdetail/dishdetail.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  dishes: Dish[];
  errMess: string;

  constructor(private dishservice: DishService,
    @Inject('BaseURL') private BaseURL,
    private router: Router) { }

  ngOnInit() {
    this.dishservice.getDishes()
      .subscribe(dishes => this.dishes = dishes,
        errmess => this.errMess = <any>errmess);
  }

  dishSelected(event, dish) {
        // That's right, we're pushing to ourselves!
        console.log(dish);
        return this.router.navigateByUrl('/menu');
      }

}
