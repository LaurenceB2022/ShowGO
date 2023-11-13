package com.shifthappens.showgo.entities;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "events")
public class Event {

    //Events fields
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String guid;
    
    @ManyToOne
    @JoinColumn(name = "venue")
    private Venue venue;

    private String start_date;
    private String end_date;
    private float ticket_price;
    private String name;
    private String description;
    private int max_attendees;

    //Taken from venue
    private String location;
    private boolean hide_location;

    public Event(){
    }

    public Event(Venue v) {
        this.venue = v;
        location = v.getLocation();
        hide_location = v.getHide_location();

        start_date = "01-01-1970";
        end_date = "01-01-1970";
        ticket_price = 0;
        name = "default";
        description = "default";
    }

    public Event(Venue venue, String name) {
        this();
        this.venue = venue;
        this.name = name;
    }

     public Event (Venue v, String name, String start_date, String end_date, float ticket_price, String description, int max_attendees) {
          this.venue = v;
          location = v.getLocation();
          hide_location = v.getHide_location();

          start_date = "Jan 01 1970 12:00 AM";
          end_date = "Jan 01 1970 12:00 AM";
          ticket_price = 0;
          name = "N/A";
          description = "N/A";
          max_attendees = 0;
     }

      public Venue getVenue() {
         return venue;
    }

    public void setVenue(Venue venue) {
         this.venue = venue;
    }

    public String getName() {
         return name;
    }

    public void setName(String name) {
         this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
         this.location = location;
    }

    public void setStart_date(String date) {
         start_date = date;
    }

    public String getStart_date() {
        return start_date;
    }

    public String getEnd_date() {
        return end_date;
    }

    public void setEnd_date(String date) {
         end_date = date;
    }

    public String getDescription() {
         return this.description;
     }

    public boolean getHide_location() {
         return hide_location;
     }

    public void setHide_location(boolean visibility) {
         this.hide_location = visibility;
    }

    public void setDescription(String description) {
         this.description = description;
    }


}
