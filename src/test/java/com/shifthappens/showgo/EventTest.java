package com.shifthappens.showgo;

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
public class EventTest {
    Venue Venue1= new Venue("test1", "test1", "testpassword");
    Event Event1 = new Event(Venue1, "test1");
    Event Event2 = new Event(Venue1, "test2", "April 2 1970 1:00 AM", "April 3 1970 12:00 PM", 5, "SEIUJFNVNFLDLSslkdjfer");

    @Autowired
    private VenueRepository VenueRepository;

    @Autowired
    private EventRepository EventRepository;
    
    private EventController EventController;

    @Before
    public void setUp() throws Exception {
        //save Venue and event, verify has Username value after save and that event has been successfully made
        EventController  = new EventController(EventRepository);
        this.VenueRepository.save(Venue1);
        this.EventRepository.save(Event1);
        this.EventRepository.save(Event2);
        assertNotNull(Venue1.getUsername());
        assertNotNull(Event1.getVenue());
    }

    @Test
    public void testFetchData(){
        /*Test data retrieval*/
        Event EventA = EventRepository.findByguid(Event1.getGuid());
        assertNotNull(EventA);
        assertEquals(Event1.getName(), EventA.getName());
    }

    @Test
    public void testSearchEvent(){

        List<Event> events = EventController.findBySearch("test1");
        assertNotNull(events);

        events = EventController.findBySearch("test2");
        assertNotNull(events);

        events = EventController.findBySearch("April");
        assertNotNull(events);

        events = EventController.findBySearch("1970");
        assertNotNull(events);

        events = EventController.findBySearch("1:00 AM");
        assertNotNull(events);

        events = EventController.findBySearch("SEIUJFNVNFLDLSslkdjfer");
        assertNotNull(events);
        assertEquals("SEIUJFNVNFLDLSslkdjfer", events.get(0).getDescription());
        assertEquals(1, events.size());

    }

    @Test
    public void testMakeEvent() {
        EventRepository.delete(Event2);
        assertEquals(Event2.getName(), EventController.makeEvent(Event2).getName());
    }

    @After
    public void tearDown() throws Exception {
        EventRepository.delete(Event1);
        EventRepository.delete(Event2);
        VenueRepository.delete(Venue1);
    }
}
