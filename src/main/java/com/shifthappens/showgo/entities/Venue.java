package com.shifthappens.showgo.entities;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "venues")
public class Venue {

    @Id
    private String username;
    private String name;
    private String password;
    private String location;
    private boolean hide_location;
    private String description;

    public Venue(){
    }

    public Venue(String username, String name) {
        this.username = username;
        this.name = name;
        password = "default";
        location = "default";
        hide_location = false;
        description = "default";
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }


    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getLocation() {
        return this.location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public boolean isHide_location() {
        return this.hide_location;
    }

    public boolean getHide_location() {
        return this.hide_location;
    }

    public void setHide_location(boolean hide_location) {
        this.hide_location = hide_location;
    }
    
    
}
