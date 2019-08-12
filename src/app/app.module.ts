import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy, CommonModule } from '@angular/common'
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DialogComponent } from './shared/dialog/dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DynamicFormQuestionComponent } from './shared/dialog/dynamic-form-question/dynamic-form-question.component';
import { DynamicFormComponent } from './shared/dialog/dynamic-form/dynamic-form.component';
import { CheckoutDialogComponent } from './shared/dialog/ticket-dialog/checkout-dialog/checkout-dialog.component';
import { PortalModule } from '@angular/cdk/portal';
import { CashCheckoutComponent } from './shared/dialog/ticket-dialog/checkout-dialog/cash-checkout/cash-checkout.component';
import { CreditCheckoutComponent } from './shared/dialog/ticket-dialog/checkout-dialog/credit-checkout/credit-checkout.component';



import {
  MatExpansionModule,
  MatSidenavModule,
  MatListModule,
  MatInputModule,
  MatDialogModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatOptionModule,
  MatSelectModule,
  MatToolbarModule,
  MatChipsModule,
  MatAutocompleteModule,
  MatFormFieldModule } from "@angular/material";



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DialogComponent,
    DynamicFormQuestionComponent,
    DynamicFormComponent,
    CheckoutDialogComponent,
    CashCheckoutComponent,
    CreditCheckoutComponent
  ],
  imports: [
    PortalModule,
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatSidenavModule,
    MatListModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatOptionModule,
    MatSelectModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatFormFieldModule,
  ],
  exports:[
    DynamicFormComponent,
    CheckoutDialogComponent,
    CashCheckoutComponent,
    CreditCheckoutComponent,
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatSidenavModule,
    MatListModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatOptionModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatToolbarModule,
    MatFormFieldModule
  ],
  entryComponents: [
    DialogComponent,
    DynamicFormComponent,
    CheckoutDialogComponent,
    CashCheckoutComponent,
    CreditCheckoutComponent
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }