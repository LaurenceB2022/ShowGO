package com.shifthappens.showgo;

import com.shifthappens.showgo.entities.Ticket;
import com.shifthappens.showgo.entities.User;
import com.shifthappens.showgo.repositories.TicketRepository;

import com.shifthappens.showgo.entities.Event;
import com.shifthappens.showgo.entities.Venue;
import com.shifthappens.showgo.repositories.EventRepository;
import com.shifthappens.showgo.repositories.VenueRepository;

import org.junit.Before;
import org.junit.Test;
import org.junit.After;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;


import static org.junit.Assert.*;

import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
public class TicketTest {
    User User1 = new User("Username1", "Bill", "Password1");
    Venue Venue1= new Venue("test1", "test1", "testpassword");
    Event Event1 = new Event(Venue1, "test1");
    Ticket Ticket1 = new Ticket(User1, Event1);
    Ticket Ticket2 = new Ticket(User1, null);
    Ticket Ticket3 = new Ticket(null, null);

    @Autowired
    private VenueRepository VenueRepository;

    @Autowired
    private EventRepository EventRepository;
    
    private EventController EventController;
   
    @Test
    public void testGoodTicket(){
        /*Test data retrieval*/
        //Testing a good ticket that has an actual event 
        Event EventA = Ticket1.getEvent();
        assertNotNull(EventA);
        assertEquals(Event1.getName(), EventA.getName());
    }

    @Test
    public void testBadTicket(){
        /*Test data retrieval*/
        //Testing a bad ticket that has a null event 
        Event EventA = Ticket2.getEvent();
        assertNull(EventA);
    }

    @Test
    public void testNullUserTicket(){
        /*Test data retrieval*/
        //Testing a bad ticket that has a null user
        User UserA = Ticket3.getOwner();
        assertNull(UserA);
    }
}
