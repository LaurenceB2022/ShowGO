package com.shifthappens.showgo.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
/*
 * The BlockedUser class is the class that creates a blocked user object and stores that 
 * object in our database 
 */
@Entity
@Table(name = "blocked_users")
@Data
public class BlockedUser {
    //Generating the guid string
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String guid;
    //joining the table that holds the blocked users 
    @ManyToOne
    @JoinColumn(name= "user_username")
    private User user;
    //joining the table that holds the blocked users 
    @ManyToOne
    @JoinColumn(name= "venue_username")
    private Venue venue;
    //Empty method call constructor 
    public BlockedUser() {
    }
    //Constuctor that takes a user and venue argument
    public BlockedUser(User user, Venue venue) {
        this.user = user;
        this.venue = venue;
    }
}
