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
@Table(name = "blocked_users")
@Data
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

    public BlockedUser() {
    }

    public BlockedUser(User user, Venue venue) {
        this.user = user;
        this.venue = venue;
    }
}
