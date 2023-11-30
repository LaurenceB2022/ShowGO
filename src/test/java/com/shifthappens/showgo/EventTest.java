package com.shifthappens.showgo;

import com.shifthappens.showgo.entities.Event;
import com.shifthappens.showgo.entities.Venue;
import com.shifthappens.showgo.exceptions.InvalidEventCreationException;
import com.shifthappens.showgo.exceptions.InvalidGuidException;
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
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
public class EventTest {
    Venue Venue1= new Venue("test1", "test1", "testpassword");
    Venue VenueBadLocation = new Venue("test1234", "test1","MyPassword!");
    
    Event Event1 = new Event(Venue1, "test1");
    Event Event2 = new Event(Venue1, "test2", "Apr 04 1970 01:00 AM", "Apr 05 1970 12:00 PM", 5, "SEIUJFNVNFLDLSslkdjfer", 15);
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
        //Test data retrieval
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
    public void testFindEventByGuid() {
        assertThrows(InvalidGuidException.class, () -> EventController.findEventByGuid("1"));
        assertDoesNotThrow(() -> EventController.findEventByGuid(Event1.getGuid()));
    }

    @Test
    public void testEventRestrictions() {
        EventRepository.delete(Event2);
        assertEquals(Event2.getName(), EventController.makeEvent(Event2).getName());


        Event EventBadDate = new Event(Venue1, "test3", "Apr 03 1970 01:00 AM", "Apr 02 1970 12:00 PM", (float)100.11, "SsdrgbsfEIUdfergaJFNVNFLDLSslkdjferasdgsrtdf", 15);
        Event EventBadAttendees = new Event(Venue1, "test3", "Apr 02 1970 01:00 AM", "Apr 03 1970 12:00 PM", (float)100.11, "SsdrgbsfEIUdfergaJFNVNFLDLSslkdjferasdgsrtdf", -1);
        Event EventBadName = new Event(Venue1, "", "Apr 02 1970 01:00 AM", "Apr 03 1970 12:00 PM", (float)100.11, "SsdrgbsfEIUdfergaJFNVNFLDLSslkdjferasdgsrtdf", 15);
        
        StringBuilder hundredString = new StringBuilder();
        for (int i = 0; i < 100; i++) {//builds a string with length 100
            hundredString.append("0");
        }
        VenueBadLocation.setLocation(hundredString.toString());
        Event EventBadLocation = new Event(VenueBadLocation, "test3", "Apr 03 1970 01:00 AM", "Apr 02 1970 12:00 PM", (float)100.11, "SsdrgbsfEIUdfergaJFNVNFLDLSslkdjferasdgsrtdf", 15);

        Event EventBadDescription = new Event(Venue1, "test3", "Apr 02 1970 01:00 AM", "Apr 03 1970 12:00 PM", (float)100.11, "", 15);
        Event EventAllGood = new Event(Venue1, "test3", "Apr 02 1970 01:00 AM", "Apr 03 1970 12:00 PM", (float)100.11, "SsdrgbsfEIUdfergaJFNVNFLDLSslkdjferasdgsrtdf", 15);

        assertThrows(InvalidEventCreationException.class , () -> EventController.checkParams(EventBadDate));
        assertThrows(InvalidEventCreationException.class , () -> EventController.checkParams(EventBadAttendees));
        assertThrows(InvalidEventCreationException.class , () -> EventController.checkParams(EventBadName));
        assertThrows(InvalidEventCreationException.class , () -> EventController.checkParams(EventBadLocation));
        assertThrows(InvalidEventCreationException.class , () -> EventController.checkParams(EventBadDescription));
        assertDoesNotThrow(() -> EventController.checkParams(EventAllGood));
    }

    @Test
    public void testUpdateEvent() {
        Event Event2Update = new Event(Venue1, "updated", "Jan 01 2000 1:00 PM", "Jan 01 2000 12:00 AM", (float)6.5, "this is a new description", 10);
        Event2Update.setLocation("yo mamas house");
        Event2Update.setHide_location(true);
        EventController.update(Event2.getGuid(), Event2Update);

        //check start date update
        assertEquals(EventRepository.findByguid(Event2.getGuid()).getStart_date(), "Jan 01 2000 1:00 PM");
        //check end date update
        assertEquals(EventRepository.findByguid(Event2.getGuid()).getEnd_date(), "Jan 01 2000 12:00 AM");
        //check ticket price update
        assertEquals(EventRepository.findByguid(Event2.getGuid()).getTicket_price(), 6.5, 0.001);
        //check name update
        assertEquals(EventRepository.findByguid(Event2.getGuid()).getName(), "updated");
        //check description update
        assertEquals(EventRepository.findByguid(Event2.getGuid()).getDescription(), "this is a new description");
        //check description update
        assertEquals(EventRepository.findByguid(Event2.getGuid()).getLocation(), "yo mamas house");
        //check description update
        assertEquals(EventRepository.findByguid(Event2.getGuid()).isHide_location(), true);

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
