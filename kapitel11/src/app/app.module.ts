import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatInputModule,
  MatSnackBarModule,
  MatSnackBar,
  MatCardModule, MatDialogModule
} from '@angular/material';
import { HomeComponent } from './home/home.component';
import { SpeechComponent } from './speech/speech.component';
import { AboutComponent } from './about/about.component';
import { ServiceWorkerModule, SwUpdate } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TodoDialogComponent } from './todo-dialog/todo-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    SpeechComponent,
    AboutComponent,
    TodoDialogComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    HttpClientModule,
    MatSnackBarModule,
    RouterModule,
    MatCardModule,
    MatDialogModule,
    FormsModule,
  ],
  providers: [],
  entryComponents: [TodoDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(swUpdate: SwUpdate, matSnackbar: MatSnackBar) {
    swUpdate.available.subscribe(() => {
      const snackbar = matSnackbar.open('Neue Version verfügbar.', 'Neu laden');
      snackbar.onAction().subscribe(() => window.location.reload());
    });
  }
}
