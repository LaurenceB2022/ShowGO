package com.shifthappens.showgo.entities;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Getter;

@Entity
@Data
@Table(name = "events")
public class Event {

    //Events fields
    @Id
    private String guid;
    private String venue;
    private String start_date;
    private String end_date;
    private float ticket_price;
    private String name;
    private String description;

    //Taken from venue
    private String location;
    private boolean hide_location;

    public Event(){
        venue = "default";
        start_date = "Jan 1, 1970 00:00";
        end_date = "Jan 1, 1970 00:00";
        ticket_price = 0;
        name = "default";
        description = "default";

        location = "default";
        hide_location = false;
    }

    public Event(String venue) {
        this();
        this.venue = venue;
        //TODO Event needs to pull data from venue or map
    }

    public Event(String venue, String name) {
        this();
        this.venue = venue;
        this.name = name;
    }

    //@Data should make all of this, leaving until someone tests this


    //  public String getVenue() {
    //     return venue;
    // }

    // public void setVenue(String venue) {
    //     this.venue = venue;
    // }

    // public String getName() {
    //     return name;
    // }

    // public void setName(String name) {
    //     this.name = name;
    // }

    // public String getLocation() {
    //     return location;
    // }

    // public void setLocation(String location) {
    //     this.location = location;
    // }

    // public String getDate() {
    //     return date;
    // }

    // public void setDate(String date) {
    //     this.date = date;
    // }


    // public String getTime() {
    //     return time;
    // }

    // public void setTime(String time) {
    //     this.time = time;
    // }

    // public String getDescription() {
    //     return this.description;
    // }

    // public boolean getHide_location() {
    //     return hide_location;
    // }

    // public void setHide_location(boolean visibility) {
    //     this.hide_location = visibility;
    // }

    // public void setDescription(String description) {
    //     this.description = description;
    // }


}
