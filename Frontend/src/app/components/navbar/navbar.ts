import { Component  , HostListener} from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],  // RouterLink هي بدل ال href هي اسرع واحسن
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

    constructor(public authService: AuthService) {}

    isScrolled = false;

  @HostListener('window:scroll', [])
  onScroll() {
    this.isScrolled = window.scrollY > 50;
  }

}
