import { Component, HostListener } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SyncService } from '../sync.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  installPrompt;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private syncService: SyncService) {}

  @HostListener('window:beforeinstallprompt', ['$event'])
  onBeforeInstallPrompt(event: Event) {
    this.installPrompt = event;
    return false;
  }

  @HostListener('window:appinstalled')
  onAppInstalled() {
    this.installPrompt = null;
  }

  install() {
    this.installPrompt.prompt();
  }

  sync() {
    this.syncService.sync();
  }
}
