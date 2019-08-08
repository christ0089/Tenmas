import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'tabs', pathMatch: 'full' },
  { path: 'tabs', loadChildren: './Pages/tabs/tabs.module#TabsPageModule' },
  { path: 'home', loadChildren: './Pages/home/home.module#HomePageModule' },
  { path: 'register', loadChildren: './Pages/register/register.module#RegisterPageModule' },
  { path: 'register/:rfc', loadChildren: './Pages/register/register.module#RegisterPageModule' },
  { path: 'approve/:docId/:rfc', loadChildren: './Pages/approve/approve.module#ApprovePageModule' },
  { path: 'station-scan', loadChildren: './Pages/station-scan/station-scan.module#StationScanPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
