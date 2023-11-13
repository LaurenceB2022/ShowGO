package com.shifthappens.showgo.entities;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "tickets")
public class Ticket {

    //Events fields
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String guid;
    
    @ManyToOne
    @JoinColumn(name = "owner")
    private User owner;
    
    @OneToOne
    @JoinColumn(name = "event_guid")
    private Event event;

    public Ticket(){
    }

    public Ticket(User u, Event e) {
        this.owner = u;
        this.event = e;
    }

    public Event getEvent() {
        return this.event;
    }
}
