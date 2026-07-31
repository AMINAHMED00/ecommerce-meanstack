import { Component } from '@angular/core';
import { HeroSlider } from '../hero-slider/hero-slider';
import { TrendingProducts } from '../trending-products/trending-products';
import { LatestNews } from '../latest-news/latest-news';

@Component({
  selector: 'app-home',
  imports: [HeroSlider,TrendingProducts , LatestNews],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  // data binding
  // 1- text interpolation => بستدعي ال properties and methods in {{}}. => معظم الاستخدامات بتكون مع ال text
  // 2- property binding => (src = "" => [src] = "image")
  // 3- event binding => بنحطه في (click) = "function"


  //name = "Amin" ;

  constructor() {
    console.log("Home Component Loaded");
  }

  image = "/messi.jpg" ;
  colors = ["red" , "yellow" , "blue" , "black" , "white"];
  login = true ;
  age = 21 ;

  sayHello(name : string){
    return (`Hello ${name}`);
  }

  welcome(name : string){
    console.log(`Welcom ${name}`);
  }

  change(){
    this.login = !this.login ;
  }
}
