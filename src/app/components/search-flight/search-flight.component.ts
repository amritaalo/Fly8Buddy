import { Component } from '@angular/core';
import { jsPDF } from "jspdf";
@Component({
  selector: 'app-search-flight',
  templateUrl: './search-flight.component.html',
  styleUrls: ['./search-flight.component.css']
})
export class SearchFlightComponent {

  flightdetails = [
    { Comb_IAT_CODE: "INDNY2023-10-02", Sourcecity: "India", SourceIATA_Code: "IND", DestCity: "NewYork", DestIATA_Code: "NY", Departure_date: "02/10/2023", BasePrice: 60000, Airline: "British Airways" },
    { Comb_IAT_CODE: "BOMPAR2023-08-01", Sourcecity: "Mumbai", SourceIATA_Code: "BOM", DestCity: "Paris", DestIATA_Code: "PAR", Departure_date: "01/08/2023", BasePrice: 70000, Airline: "Air India" },
    { Comb_IAT_CODE: "BANDEL2023-09-05", Sourcecity: "Bangalore", SourceIATA_Code: "BAN", DestCity: "Delhi", DestIATA_Code: "DEL", Departure_date: "05/09/2023", BasePrice: 85000, Airline: "SpiceJet" },
    { Comb_IAT_CODE: "BOMVIE2023-09-21", Sourcecity: "Mumbai", SourceIATA_Code: "Vietnam", DestCity: "Vietnam", DestIATA_Code: "VIE", Departure_date: "21/09/2023", BasePrice: 50000, Airline: "Jet Airways" },
    { Comb_IAT_CODE: "LONPAR02023-05-01", Sourcecity: "London", SourceIATA_Code: "LON", DestCity: "Paris", DestIATA_Code: "PAR", Departure_date: "01/05/2023", BasePrice: 80000, Airline: "British Airways" },
    { Comb_IAT_CODE: "BOMPAR2023-11-01", Sourcecity: "Bombay", SourceIATA_Code: "BOM", DestCity: "Paris", DestIATA_Code: "PAR", Departure_date: "01/11/2023", BasePrice: 70000, Airline: "Air India" },
    { Comb_IAT_CODE: "DELBAN2023-10-03", Sourcecity: "Delhi", SourceIATA_Code: "DEL", DestCity: "Bangalore", DestIATA_Code: "BAN", Departure_date: "03/10/2023", BasePrice: 40000, Airline: "Jet Airways" }
  ];

  city1 = "";
  city2 = "";
  dep_date = "";
  FirstPerson="";
  SecondPerson="";
  FirstChild="";
  showNoResult: boolean = false;
  foundCities: any[] = [];
  showCustomerForm: boolean = false;
  showViewConfirmationForm: boolean = false;
  ticketContent: string = "";
  selectedAirline = "";
  selecteddep_date = "";
  selectedbase_price = "";
  selectedCustomers = "";
  OnCityChange(enteredvalue1: string, enteredvalue2: string, dep_date: string) {
    var combval: string;

    combval = enteredvalue1 + enteredvalue2 + dep_date

    let foundCity = this.flightdetails.filter(foundCity => foundCity.Comb_IAT_CODE === combval);

    let i = 0;
    this.foundCities.length = 0;
    if (foundCity != undefined) {
      if (foundCity.length != 0) {
        this.showNoResult = false

        while (i < foundCity.length) {
          this.foundCities.push(foundCity[i])
          i++;
        }
      }
      else {
        this.showNoResult = true;
        this.showViewConfirmationForm = false;
        this.showCustomerForm = false;
        this.foundCities.length = 0
      }
    }
  }

  bookTickets(airline: any, dep_date: any, base_price: any) {
    this.showCustomerForm = true;
    this.selectedAirline = airline;
    this.selecteddep_date = dep_date;
    this.selectedbase_price = base_price;
  }
  ViewConfirmation(FirstPerson: any, SecondPerson: any, FirstChild: any) {
    this.showViewConfirmationForm = true;
    this.showCustomerForm = false;
    this.selectedCustomers = FirstPerson + "  " + SecondPerson + "  " + FirstChild
  }
  ViewTicket() {
     this.ticketContent = `<h2>Plane Ticket Purchase</h2> <hr>
     <b>Booking Date</b> <BR> 
     ${this.selecteddep_date} <BR>
     <b>Guest Name </b> <BR> 
     ${this.selectedCustomers} <BR> 
     <b>Price ${this.selectedbase_price} </b> <BR>
     <p><b>Flight Details :</b></p>
     <b>Airline</b> <BR> ${this.selectedAirline}<BR>
     <b>Departure Date</b> <BR> ${this.selecteddep_date}`
  }

  DownloadTicket(){
    const doc = new jsPDF();
    doc.text("Plane Ticket Purchase \r\n" + "Booking Date\r\n" +`${this.selecteddep_date}` + "\r\n Guest Name \r\n" + `${this.selectedCustomers}`
    + "\r\n \r\n Flight Details \r\n Airline:" + `${this.selectedAirline}`
    + "\r\n Departure Date: " + `${this.selecteddep_date}`
    + "\r\n Price Details:" + `${this.selectedbase_price}`, 10, 10);
    doc.save("Ticket.pdf");
  }
}
