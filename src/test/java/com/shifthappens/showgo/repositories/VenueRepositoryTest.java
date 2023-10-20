package com.shifthappens.showgo.repositories;

import com.shifthappens.showgo.entities.Venue;

import org.junit.Before;
import org.junit.Test;
import org.junit.After;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class VenueRepositoryTest {
    Venue Venue1= new Venue("Alice", "test1");
    Venue Venue2= new Venue("Bob", "test2");

    @Autowired
    private VenueRepository VenueRepository;
    @Before
    public void setUp() throws Exception {
        
        //save Venue, verify has Username value after save
        this.VenueRepository.save(Venue1);
        this.VenueRepository.save(Venue2);
        assertNotNull(Venue1.getUsername());
        assertNotNull(Venue2.getUsername());
    }
    @Test
    public void testFetchData(){
        /*Test data retrieval*/
        Venue VenueA = VenueRepository.findByUsername("Bob");
        assertNotNull(VenueA);
        assertEquals("test2", VenueA.getName());
        Venue VenueB = VenueRepository.findByUsername("Alice");
        assertNotNull(VenueB);
        assertEquals("test1", VenueB.getName());
    }

    @After
    public void tearDown() throws Exception {
        VenueRepository.delete(Venue1);
        VenueRepository.delete(Venue2);
    }
}
