import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminToolsComponent } from './components/admin-tools/admin-tools.component';
import { DetaljniPrikazComponent } from './components/detaljni-prikaz/detaljni-prikaz.component';
import { HomeComponent } from './components/home/home.component';
import { KorisnikControlComponent } from './components/korisnik-control/korisnik-control.component';
import { LoginComponent } from './components/login/login.component';
import { LokalEditComponent } from './components/lokal-edit/lokal-edit.component';
import { LokalPregledComponent } from './components/lokal-pregled/lokal-pregled.component';
import { LokalModeratorComponent } from './components/lokalModerator/lokal-moderator/lokal-moderator.component';
import { ModeratorControlComponent } from './components/moderator-control/moderator-control.component';
import { ProfilComponent } from './components/profil/profil.component';
import { RegisterComponent } from './components/register/register.component';
import { RestoranComponent } from './components/restoran/restoran.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'restoran', component: DetaljniPrikazComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profil', component: ProfilComponent},
  {path: 'korisnikControl', component: KorisnikControlComponent},
  {path: 'lokaliControl', component: LokalPregledComponent},
  {path: 'edit', component:LokalEditComponent},
  {path: 'moderatorControl', component:ModeratorControlComponent},
  {path: 'lokalModerator', component:LokalModeratorComponent},
  {path: 'admin', component:AdminToolsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
