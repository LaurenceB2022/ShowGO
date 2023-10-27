package com.shifthappens.showgo.entities;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "events")
public class Event {

    @Id
    private String venue;
    private String name;
    private String location;
    private String date;
    private String time;
    private boolean hide_location;
    private String description;

    public Event(){
        venue = "default";
        name = "default";
        location = "default";
        time = "00:00";
        hide_location = false;
        description = "default";
    }

    public Event(String venue) {
        this();
        this.venue = venue;
    }

    public Event(String venue, String name) {
        this();
        this.venue = venue;
        this.name = name;
    }

     public String getVenue() {
        return venue;
    }

    public void setVenue(String venue) {
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

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }


    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
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
