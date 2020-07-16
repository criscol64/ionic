import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { ActivatedRoute } from '@angular/router';
import { FavoriteService } from '../services/favorite.service';
import { ToastController, ActionSheetController, ModalController } from '@ionic/angular';
import { CommentPage } from '../comment/comment.page';
import { Comment } from '../shared/comment';

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
  favorite: boolean = false;
  newcomment: Comment;

  constructor(@Inject('BaseURL') private BaseURL,
    private dishservice: DishService,
    private route: ActivatedRoute,
    private favoriteservice: FavoriteService,
    private toastCtrl: ToastController,
    private actionsheetCtrl: ActionSheetController,
    public modalcontroller: ModalController) {
    }

  ngOnInit() {
    const id = +this.route.snapshot.params['id'];
    this.dishservice.getDish(id)
      .subscribe(dish => {
        this.dish = dish; this.numcomments = this.dish.comments.length;
        let total = 0;
        this.dish.comments.forEach(comment => total += comment.rating );
        this.avgstars = (total/this.numcomments).toFixed(2);
        this.favorite = this.favoriteservice.isFavorite(this.dish.id);
      });
  }

  async addToFavorites() {
    console.log('Adding to Favorites', this.dish.id);
      this.favorite = this.favoriteservice.addFavorite(this.dish.id);
    const toast = await this.toastCtrl.create({
      message: 'Dish ' + this.dish.id + ' Added Favorite successfully',
      position: 'middle',
      color: "medium",
      duration: 3000});
    toast.present();
  }

  async showActionSheet() {
    const actionSheet = await this.actionsheetCtrl.create({
      header: 'Select Actions',
      buttons: [{
        text: 'Add to Favorites',
        handler: () => {
          console.log('Add to Favorites clicked');
          this.addToFavorites();
        }
      }, {
        text: 'Add Comment',
        handler: () => {
          console.log('Add Comment clicked');
          this.openComment();
        }
      }, {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  async openComment() {
    const modal = await this.modalcontroller.create({
      component: CommentPage
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    this.newcomment = data.comment;
    console.log(data.comment);
  }

}
