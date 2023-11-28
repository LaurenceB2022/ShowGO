package com.shifthappens.showgo;

import com.shifthappens.showgo.entities.Ticket;
import com.shifthappens.showgo.entities.User;

import com.shifthappens.showgo.entities.Event;
import com.shifthappens.showgo.entities.Venue;
import com.shifthappens.showgo.exceptions.InvalidGuidException;
import com.shifthappens.showgo.exceptions.InvalidTicketBuyException;
import com.shifthappens.showgo.repositories.UserRepository;
import com.shifthappens.showgo.repositories.VenueRepository;
import com.shifthappens.showgo.repositories.BlockedUserRepository;
import com.shifthappens.showgo.repositories.EventRepository;
import com.shifthappens.showgo.repositories.TicketRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;


import org.junit.Before;
import org.junit.After;
import static org.junit.Assert.*;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;


@RunWith(SpringRunner.class)
@SpringBootTest
public class TicketTest {
    User User1 = new User("Username1", "Bill", "Password1");
    User User2 = new User("username2", "testUser1", "Password!");

    Venue Venue1= new Venue("test1", "test1", "testpassword");
   
    Event Event1 = new Event(Venue1, "test1");
    Event Event2 = new Event(Venue1, "test2");

    Ticket Ticket1 = new Ticket(User1, Event1);
   

    @Autowired
    private VenueRepository VenueRepository;
    @Autowired
    private UserRepository UserRepository;
    @Autowired
    private EventRepository EventRepository;
    @Autowired
    private TicketRepository TicketRepository;
    @Autowired
    private BlockedUserRepository BlockedUserRepository;

    private TicketController TicketController;
    
    @Before
    public void setUp() throws Exception {
        this.VenueRepository.save(Venue1);

        this.UserRepository.save(User1);
        this.UserRepository.save(User2);

        this.EventRepository.save(Event1);
        this.EventRepository.save(Event2);

        this.TicketRepository.save(Ticket1);
        
        this.TicketController = new TicketController(this.TicketRepository, this.BlockedUserRepository);
    }

    @Test
    public void testRedeemTicket() {
        Ticket nullTicket = null;
        assertThrows(InvalidGuidException.class, () -> TicketController.redeemTicket(nullTicket));
        assertThrows(InvalidGuidException.class, () -> TicketController.redeemTicket("1"));
        assertTrue(TicketController.redeemTicket(Ticket1.getGuid()).isRedeemed());
    }

    @Test
    public void testMakeAndDeleteTicket() {
        Ticket newTicket = new Ticket(User1, Event2);
        try{
            assertNotNull(TicketController.createTicket(newTicket).getGuid());
            assertDoesNotThrow(() -> TicketController.deleteTicket(newTicket));
        }
        catch (Exception e) {
            TicketRepository.delete(newTicket);
        }
        
        Ticket badTicket = new Ticket(User1, Event1);
        try{
            assertThrows(InvalidTicketBuyException.class, () -> TicketController.createTicket(badTicket));
        }
        catch (Exception e) {
            TicketRepository.delete(badTicket);
        }
    }

    @Test
    public void testGetTicketByOwner() {
        assertEquals(1, TicketController.findByOwner(User1.getUsername()).size());
        assertTrue(TicketController.findByOwner(User2.getUsername()).isEmpty());
    }

     @After
    public void tearDown() throws Exception {

        TicketRepository.delete(Ticket1);

        EventRepository.delete(Event1);
        EventRepository.delete(Event2);

        UserRepository.delete(User1);
        UserRepository.delete(User2);

        VenueRepository.delete(Venue1);
       
    }

}
