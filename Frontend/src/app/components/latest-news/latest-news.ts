import { Component } from '@angular/core';

@Component({
  selector: 'app-latest-news',
  imports: [],
  templateUrl: './latest-news.html',
  styleUrl: './latest-news.css',
})
export class LatestNews {

  news = [
    {
      image: 'assets/news/news1.png',
      title: 'Apple Launches iPhone 16 Pro',
      description: 'Discover the powerful A18 Pro chip with enhanced cameras and improved battery life.',
      date: 'July 2026'
    },

    {
      image: 'assets/news/news2.png',
      title: 'Back to School Laptop Deals',
      description: 'Enjoy exclusive discounts on premium laptops for students and professionals.',
      date: 'July 2026'
    },

    {
      image: 'assets/news/news3.png',
      title: 'Sony WH-1000XM5 Special Offer',
      description: 'Get premium noise-cancelling headphones with limited-time savings.',
      date: 'July 2026'
    }
  ];
}
