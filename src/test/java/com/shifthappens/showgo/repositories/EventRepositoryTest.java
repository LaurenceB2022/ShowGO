package com.shifthappens.showgo.repositories;

import com.shifthappens.showgo.entities.Event;
import com.shifthappens.showgo.EventController;
import com.shifthappens.showgo.entities.Venue;
import com.shifthappens.showgo.VenueController;

import org.junit.Before;
import org.junit.Test;
import org.junit.After;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import static org.junit.Assert.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@SpringBootTest
public class EventRepositoryTest {
    Venue Venue1= new Venue("test1", "test1", "testpassword");
    Event Event1 = new Event(Venue1);

    @Autowired
    private VenueRepository VenueRepository;
    @Autowired
    private EventRepository EventRepository;
    @Before
    public void setUp() throws Exception {
        //save Venue and event, verify has Username value after save and that event has been successfully made
        this.VenueRepository.save(Venue1);
        this.EventRepository.save(Event1);
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

    @After
    public void tearDown() throws Exception {
        VenueRepository.delete(Venue1);
        EventRepository.delete(Event1);
    }
}
