import { Routes } from '@angular/router';
import { IntroComponent } from './pages/intro/intro.component';
import { HomeMenuComponent } from './pages/home-menu/home-menu.component';
import { SubItemListComponent } from './pages/home-menu/sub-item-list/sub-item-list.component';
import { ResumeComponent } from './pages/resume/resume.component';
import { PaymentStepComponent } from './pages/payment-step/payment-step.component';

export const routes: Routes = [
    { path: '', component: IntroComponent },
    {
        path: 'menu',
        component: HomeMenuComponent,
    },
    { path: 'menu/:id', component: SubItemListComponent },
    { path: 'resume', component: ResumeComponent },
    { path: 'payment', component: PaymentStepComponent },
    { path: '**', redirectTo: '' }
];
