import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HotelBookingService } from '../app/booking-service.service';

import { HotelBooking } from './models/hotelBooking';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @Input() hotelBooking: HotelBooking;
  // to delete the item
  @Output() deleteHotelBooking: EventEmitter<HotelBooking> = new EventEmitter();
  
  title = 'hotelBooking';
  hotelBookings: HotelBooking[];

  //create new variables
  hotelName = "";
  pricePerNight:number;
  nbOfNights:number;

  //is editable
  isEditable:boolean;

  constructor(private hotelBookingService:HotelBookingService) { }

  ngOnInit() {
    this.fetchData();
    
  }
  fetchData() {
    this.hotelBookingService.getHotelBookings().subscribe(hotelBookings =>{
      this.hotelBookings = hotelBookings;
    });
}
  onDelete(hotelBooking) {
    console.log('delete',hotelBooking);
    this.hotelBookingService.deleteHotelBooking(hotelBooking).subscribe(()=> {
      this.fetchData();
    });
  }
  onSubmit(){
    const hotelBooking: HotelBooking = Object.assign({},this.hotelBooking);
    hotelBooking.hotelName = this.hotelName;
    hotelBooking.pricePerNight = this.pricePerNight;
    hotelBooking.nbOfNights = this.nbOfNights;
    
    this.hotelBookingService.addHotelBooking(hotelBooking).subscribe(()=> {
      this.fetchData();
    });
  }
  onEdit(hotelBooking){
    this.hotelBookingService.updateHotelBooking(hotelBooking).subscribe(()=> {
      this.fetchData();
    });
  }
}
