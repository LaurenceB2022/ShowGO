package com.shifthappens.showgo.entities;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Event {

    @Id
    private String name;
    private String location;
    private String date;
    private String time;
    private boolean hide_location;
    private String description;

    public Event(){
        name = "default";
        location = "default";
        time = "00:00";
        hide_location = false;
        description = "default";
    }

    public Event(String name) {
        this();
        this.name = name;
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
