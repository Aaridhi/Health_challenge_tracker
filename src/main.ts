import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideEchartsCore, NGX_ECHARTS_CONFIG } from 'ngx-echarts'; // ✅ Correct import
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideAnimations(),
    provideEchartsCore({ echarts: () => import('echarts') }) // ✅ Fix: Correct Configuration
  ]
}).catch(err => console.error(err));
