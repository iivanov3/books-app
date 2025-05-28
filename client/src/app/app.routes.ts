import { Routes } from '@angular/router';
import { ErrorComponent } from './component/error/error.component';
import { ListBooksComponent } from './component/list-books/list-books.component';
import { LoginComponent } from './component/login/login.component';
import { LogoutComponent } from './component/logout/logout.component';
import { BookComponent } from './component/book/book.component';
import { WelcomeComponent } from './component/welcome/welcome.component';
import { RegisterComponent } from './component/register/register.component';
import { FavoritesComponent } from './component/favorites/favorites.component';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
    { path: '', component: WelcomeComponent },
    { path: 'login', component: LoginComponent, canActivate: [authGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [authGuard] },
    { path: 'books', component: ListBooksComponent },
    { path: 'books/add', component: BookComponent, canActivate: [authGuard] },
    { path: 'books/edit/:id', component: BookComponent, canActivate: [authGuard] },
    { path: 'logout', component: LogoutComponent, canActivate: [authGuard] },
    { path: 'favorites', component: FavoritesComponent, canActivate: [authGuard] },
    { path: '**', component: ErrorComponent },
];
