package com.shifthappens.showgo.entities;


import java.time.LocalDateTime;

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

    private LocalDateTime start_date;
    private LocalDateTime end_date;
    private float ticket_price;
    private String name;
    private String description;

    //Taken from venue
    private String location;
    private boolean hide_location;

    public Event(){
    }

    public Event(Venue v) {
        this.venue = v;
        location = v.getLocation();
        hide_location = v.getHide_location();

        start_date = LocalDateTime.now();
        end_date = LocalDateTime.now();
        ticket_price = 0;
        name = "default";
        description = "default";
    }

    public Event(Venue venue, String name) {
        this();
        this.venue = venue;
        this.name = name;
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

    public void setStartDate(LocalDateTime date) {
         start_date = date;
    }


    public LocalDateTime getEndDate() {
        return end_date;
    }

    public void setEndDate(LocalDateTime date) {
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
