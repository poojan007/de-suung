import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'changepin',
    loadChildren: () => import('./changepin/changepin.module').then( m => m.ChangepinPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'upcomingevents',
    loadChildren: () => import('./upcomingevent/upcomingevent.module').then( m => m.UpcomingeventPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'registeredevents',
    loadChildren: () => import('./registeredevents/registeredevents.module').then( m => m.RegisteredeventsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'contributions',
    loadChildren: () => import('./contributions/contributions.module').then( m => m.ContributionsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'contactus',
    loadChildren: () => import('./contactus/contactus.module').then( m => m.ContactusPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'coordinatorevents',
    loadChildren: () => import('./coordinator-events/coordinator-events.module').then( m => m.CoordinatorEventsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'createevent',
    loadChildren: () => import('./create-event/create-event.module').then( m => m.CreateEventPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'logout',
    loadChildren: () => import('./logout/logout.module').then( m => m.LogoutPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'updateprofile',
    loadChildren: () => import('./updateprofile/updateprofile.module').then( m => m.UpdateprofilePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'generate-qr',
    loadChildren: () => import('./generate-qr/generate-qr.module').then( m => m.GenerateQrPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'scanqr',
    loadChildren: () => import('./scanqr/scanqr.module').then( m => m.ScanqrPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'profile-qrcode',
    loadChildren: () => import('./profile-qrcode/profile-qrcode.module').then( m => m.ProfileQrcodePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'shop',
    loadChildren: () => import('./desuung-shop/desuung-shop.module').then( m => m.DesuungShopPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'appinfo',
    loadChildren: () => import('./appinfo/appinfo.module').then( m => m.AppinfoPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'faq',
    loadChildren: () => import('./faq/faq.module').then( m => m.FaqPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'tor',
    loadChildren: () => import('./tor/tor.module').then( m => m.TorPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'map',
    loadChildren: () => import('./map/map.module').then( m => m.MapPageModule)
  },
  {
    path: 'incident-alert',
    loadChildren: () => import('./incident-alert/incident-alert.module').then( m => m.IncidentAlertPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'entertainment',
    loadChildren: () => import('./entertainment/entertainment.module').then( m => m.EntertainmentPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'disclaimer',
    loadChildren: () => import('./disclaimer/disclaimer.module').then( m => m.DisclaimerPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'listen',
    loadChildren: () => import('./listen/listen.module').then( m => m.ListenPageModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
