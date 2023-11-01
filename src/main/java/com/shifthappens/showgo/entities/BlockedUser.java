package com.shifthappens.showgo.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "blocked_users")
public class BlockedUser {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String guid;

    @ManyToOne
    @JoinColumn(name= "user_username")
    private User user;

    @ManyToOne
    @JoinColumn(name= "venue_username")
    private Venue venue;

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Venue getVenue() {
        return this.venue;
    }

    public void setVenue(Venue venue) {
        this.venue = venue;
    }

    public BlockedUser() {
    }

    public BlockedUser(User user, Venue venue) {
        this.user = user;
        this.venue = venue;
    }
}
