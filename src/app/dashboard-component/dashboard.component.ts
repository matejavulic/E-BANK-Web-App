/*
 * License: The MIT License (MIT)
 * Author:E-bank IT team
 * Author email: @ebanka-it.com
 * Date: Fri Aug 23 2019
 * Description: 
 * Component for handling data to be shown on the Dashboard page
 * (Recent transactions & Exchange rate tables as far as Available ballance
 * & Fund trasfer boxes)
 *
 */
import { Component, OnInit, Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DashService } from './dashboard.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
@Injectable()
export class DashboardComponent implements OnInit, OnDestroy {
  
 // Here, we will store retrieved user data form server
  user = {
    name: "",
    surname: "",
    clientNumber: 0,
    branch: "",
    balance: 0,
    transactions: {trans: [] },
    limitMonthly: 0,
    usedLimit: 0
  };

  //transactions table variables
  dataSource = [];
  columnsToDisplayEng = ['description', 'amount', 'senderAccountNumber', 'date'];
  expandedElement: LastTransaction | null;
  
  //exchange rate table variables
  dataSource2 = new MatTableDataSource(ELEMENT_DATA2);
  columnsToDisplayExchange = ['country', 'selling', 'buying', 'average'];
  
  isLoading = false;
  userIsAuthenticated = false;
  hasTransactions = false; // if there are no transactions for logged user, set a flag for front-end
  
  private authStatusSub: Subscription;
  private userSub: Subscription;

  constructor(
    private authService: AuthService, public dashService: DashService){}
  
  ngOnInit() {
    this.isLoading = true;
    const userId = this.authService.getUserId();
    this.dashService.getUserData(userId);
    this.userSub = this.dashService.getUserDataListener()
      .subscribe((
        userData: {
           name: string,
           surname: string, 
           clientNumber: number, 
           branch: string, 
           balance: number, 
           transactions: {trans: [] }, 
           limitMonthly: number, 
           usedLimit: number
          }) => 
      {
        this.isLoading = false;
        this.user = userData; 
        let dataSourceTemp = [];
        this.user.transactions.trans.map((element, index) => {
          dataSourceTemp.push(element);
          dataSourceTemp[index].date = this.dashService.dateFromISO8601(element.date); 
          dataSourceTemp[index].dateKnjizenja = this.dashService.dateFromISO8601(element.dateKnjizenja);
        });
        this.dataSource = dataSourceTemp; 
        if (this.dataSource.length > 0) {
          this.hasTransactions = true;
        }
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }


  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}

/*
 * Interface for accessing transaction fields
*/
export interface LastTransaction {
  date: string;
  dateKnjizenja: string;
  amount: number;
  paymentMethod: string;
  senderAccountNumber: number;
  receiverAccountNumber: number;
  description: string;
}

export interface ExchangeCurr {
  country: string;
  currency: string;
  selling: string;
  buying: string;
  average: string;
}

//Dummy data, not yet implmented fetching from server
const ELEMENT_DATA2: ExchangeCurr[] = [
  {country: 'SAD', currency: 'USD', buying: "105,86", selling:"106,49", average:"106,17"},
  {country: 'Velika Britanija', currency: 'GBP', buying: "128,65", selling:"129,42", average:"129,21"},
  {country: 'Švajcarska', currency: 'CHF', buying: "108,03", selling:"108,68", average:"108,32"},
  {country: 'Australija', currency: 'AUD', buying: "71,81", selling:"72,24", average:"72,02"},
  {country: 'Japan', currency: 'JPY', buying: "99,52", selling:"100,12", average:"100,02"},
];
