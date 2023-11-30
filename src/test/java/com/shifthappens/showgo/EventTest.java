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
    Event Event2 = new Event(Venue1, "test2", "Apr 2 1970 1:00 AM", "Apr 3 1970 12:00 PM", 5, "SEIUJFNVNFLDLSslkdjfer", 15);
    Event Event3 = new Event(Venue1, "test3", "Apr 02 1970 01:00 AM", "Apr 03 1970 12:00 PM", (float)100.11, "SsdrgbsfEIUdfergaJFNVNFLDLSslkdjferasdgsrtdf", 15);

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
        this.EventRepository.save(Event3);
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

    @Test
    public void testUpdateEvent() {
        EventController.update(Event2.getGuid(), "start_date", "Jan 01 2000 1:00 PM"); //check start_date update
        assertEquals(EventRepository.findByguid(Event2.getGuid()).getStart_date(), "Jan 01 2000 1:00 PM");

        EventController.update(Event2.getGuid(), "end_date", "Jan 01 2000 12:00 AM"); //check end_date update
        assertEquals(EventRepository.findByguid(Event2.getGuid()).getEnd_date(), "Jan 01 2000 12:00 AM");

        EventController.update(Event2.getGuid(), "ticket_price", "6.5"); //check ticket price update
        assertEquals(EventRepository.findByguid(Event2.getGuid()).getTicket_price(), 6.5, 0.001);

        EventController.update(Event1.getGuid(), "name", "updated"); //check name update
        assertEquals(EventRepository.findByguid(Event1.getGuid()).getName(), "updated");
        EventController.update(Event1.getGuid(), "name", "test1");
        assertEquals(Event1.getName(), "test1");

        EventController.update(Event2.getGuid(), "description", "this is a new description"); //check description update
        assertEquals(EventRepository.findByguid(Event2.getGuid()).getDescription(), "this is a new description");

        EventController.update(Event2.getGuid(), "location", "yo mamas house"); //check description update
        assertEquals(EventRepository.findByguid(Event2.getGuid()).getLocation(), "yo mamas house");

        EventController.update(Event2.getGuid(), "hide_location", "True"); //check description update
        assertEquals(EventRepository.findByguid(Event2.getGuid()).getHide_location(), true);

    }
    
    @Test
    public void testFilteredSearchDates() {
        List<Event> events = EventController.findBySearchAndFilter("", "Apr 02 1970 12:00 AM", "Apr 02 1970 03:00 PM", "-1", "-1");
        assertNotNull(events);
        assertEquals(1, events.size());
    }

    @Test
    public void testFilterdSearchPrice() {
        List<Event> events = EventController.findBySearchAndFilter("", "null", "null", "100.10", "100.12");
        assertNotNull(events);
        assertEquals(1, events.size());
    }

    @Test
    public void testFilteredSearchDatesAndBadPrice(){
        List<Event> events = EventController.findBySearchAndFilter("", "Apr 02 1970 12:00 AM", "Apr 02 1970 03:00 PM", "100.12", "100.13");
        assertTrue(events.isEmpty());
    }

    @Test
    public void testFilteredSearchPriceAndBadDates() {
        List<Event> events = EventController.findBySearchAndFilter("", "Apr 01 1970 12:00 AM", "Apr 01 1970 03:00 PM", "0", "100.12");
        assertTrue(events.isEmpty());
    }

    @After
    public void tearDown() throws Exception {
        EventRepository.delete(Event1);
        EventRepository.delete(Event2);
        EventRepository.delete(Event3);
        VenueRepository.delete(Venue1);
    }
}
