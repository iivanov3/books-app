import { Routes } from '@angular/router';
import { ErrorComponent } from './component/error/error.component';
import { ListBooksComponent } from './component/list-books/list-books.component';
import { LoginComponent } from './component/login/login.component';
import { LogoutComponent } from './component/logout/logout.component';
import { BookComponent } from './component/book/book.component';
import { WelcomeComponent } from './component/welcome/welcome.component';
import { RegisterComponent } from './component/register/register.component';
import { FavoritesComponent } from './component/favorites/favorites.component';
import { AddBookComponent } from './add-book/add-book.component';

export const routes: Routes = [
    { path: '', component: ListBooksComponent },
    { path: 'welcome', component: WelcomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'books', component: ListBooksComponent },
    { path: 'books/:id', component: BookComponent },
    { path: 'books/add', component: AddBookComponent },
    { path: 'logout', component: LogoutComponent },
    { path: 'favorites', component: FavoritesComponent },
    { path: '**', component: ErrorComponent },
];
