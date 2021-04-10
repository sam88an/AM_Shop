import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [],
  imports: [MaterialModule, HttpClientModule, FlexLayoutModule, MatCardModule],
  exports: [MaterialModule, HttpClientModule, FlexLayoutModule, MatCardModule],
})
export class SharedModule {}
