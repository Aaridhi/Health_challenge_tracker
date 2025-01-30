import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';

@NgModule({
  imports: [BrowserModule, FormsModule],  // ✅ Only import required modules
  providers: [provideAnimations()],
  bootstrap: []  // ✅ Remove AppComponent from here
})
export class AppModule {}
