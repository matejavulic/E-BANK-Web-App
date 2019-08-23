/*
 * License: The MIT License (MIT)
 * Author:E-bank IT team
 * Author email: @ebanka-it.com
 * Date: Fri Aug 23 2019
 * Description: 
 * Service which gets related user data (to be shown on dashboard page)
 * from server, formats it (date function) and emits it has done fetching
 * via dashStatus listener observable
 *
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DashService {

    private dashStatusListener = new Subject<{ name: string, surname: string, clientNumber: number, branch: string }>(); // objekat klase koja odasilje podatke svim zaint. stranama

    constructor(private http: HttpClient, private router: Router) { }

    /*
    Function to fetch all related user data from server
    to show it on Dasboard (Home) page
    */
    getUserData(userId: string) {
        const userData = {
            name: "",
            surname: "",
            clientNumber: 0,
            branch: "",
            balance: 0,
            transactions: [],
            limitMonthly: 0,
            usedLimit: 0
        };
        this.http.get
            <{
                name: string,
                surname: string,
                clientNumber: number,
                branch: string,
                balance: number,
                transactions: [],
                limitMonthly: number,
                usedLimit: number
            }>
            ('http://localhost:3000/api/user/dash/' + userId)
            .subscribe(res => {
                userData.name = res.name;
                userData.surname = res.surname;
                userData.clientNumber = res.clientNumber;
                userData.branch = res.branch;
                userData.balance = res.balance;
                userData.limitMonthly = res.limitMonthly;
                userData.usedLimit = res.usedLimit;
                userData.transactions = res.transactions;
                this.dashStatusListener.next(userData);
            });
    }

    getUserDataListener() {
        return this.dashStatusListener.asObservable(); 
    }

    /*
    Function for converting data from ISO8601 shape (from MySQL db)
    into dd-mm-yy format for frontend (transactions list table).
     */
    dateFromISO8601(isostr) {
        var parts = isostr.match(/\d+/g);
        let date = new Date(parts[0], parts[1] - 1, parts[2], parts[3], parts[4], parts[5]);

        let partialYearStr = date.getFullYear().toString().substring(2, 4);

        let day = date.getDate() + 1;
        let dayStr = day.toString();

        let month = date.getMonth() + 1;
        let monthStr = month.toString();

        if (day < 10) {
            dayStr = '0' + day;
        }

        if (month < 10) {
            monthStr = '0' + month;
        }
        return (dayStr + "-" + monthStr + "-" + partialYearStr)
    }

}
