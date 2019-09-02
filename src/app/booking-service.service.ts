import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';

import {HotelBooking} from '../app/models/hotelBooking';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class HotelBookingService {
  url:string = 'http://localhost:8080/bookings/all';
  urldelete:string = 'http://localhost:8080/bookings/delete';
  urlcreate:string = 'http://localhost:8080/bookings/create';
  urlupdate:string = 'http://localhost:8080/bookings/update';
  
  constructor(private http:HttpClient) { }

  // Get HotelBookings
  getHotelBookings():Observable<HotelBooking[]> {
    return this.http.get<HotelBooking[]>(`${this.url}`);
    
  }


  // Delete HotelBooking
  deleteHotelBooking(HotelBooking:HotelBooking):Observable<HotelBooking> {
    console.log("delete - service");
    const url = `${this.urldelete}/${HotelBooking.id}`;
    console.log(url);
    return this.http.delete<HotelBooking>(url, httpOptions).pipe(retry(2),catchError(this.handleError));
  }

  // Add HotelBooking
  addHotelBooking(hotelBooking:HotelBooking):Observable<HotelBooking> {
    console.log("add - service");
    return this.http.post<HotelBooking>(this.urlcreate, hotelBooking, httpOptions);
  }
  //update HotelBooking
  updateHotelBooking(HotelBooking:HotelBooking):Observable<HotelBooking> {
    console.log("update - service");
    const url = `${this.urlupdate}/${HotelBooking.id}`;
    return this.http.put<HotelBooking>(url, HotelBooking, httpOptions);
  }  

  //handle error
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

}