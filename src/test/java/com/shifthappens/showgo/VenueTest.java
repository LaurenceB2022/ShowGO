package com.shifthappens.showgo;

import com.shifthappens.showgo.entities.Venue;
import com.shifthappens.showgo.exceptions.InvalidPasswordException;
import com.shifthappens.showgo.exceptions.InvalidUsernameException;
import com.shifthappens.showgo.repositories.UserRepository;
import com.shifthappens.showgo.repositories.VenueRepository;

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
public class VenueTest {
    Venue Venue1= new Venue("test1", "test1", "testpassword");
    Venue Venue2= new Venue("test2", "test2", "testpassword");

    @Autowired
    private VenueRepository VenueRepository;
    @Autowired
    private UserRepository UserRepository;
    
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
        Venue VenueA = VenueRepository.findByUsername("test2");
        assertNotNull(VenueA);
        assertEquals("test2", VenueA.getName());
        Venue VenueB = VenueRepository.findByUsername("test1");
        assertNotNull(VenueB);
        assertEquals("test1", VenueB.getName());
    }

    @Test
    public void testSignUp(){
        VenueController VenueController = new VenueController(VenueRepository);

        Venue test1Venue = mock(Venue.class);
        when(test1Venue.getUsername()).thenReturn("test1");
        when(test1Venue.getPassword()).thenReturn("testpassword");
        assertThrows(InvalidUsernameException.class, () -> VenueController.signUp(test1Venue));

        Venue test2Venue = mock(Venue.class);
        when(test2Venue.getUsername()).thenReturn("tasegddthrsdfbnytsrrgffwagdghergsffc");
        when(test2Venue.getPassword()).thenReturn("1");
        assertThrows(InvalidPasswordException.class, () -> VenueController.signUp(test2Venue));
    }

    @Test
    public void testLogin(){
        VenueController VenueController = new VenueController(VenueRepository);
        UserController UserController = new UserController(UserRepository);
        LoginController LoginController = new LoginController(VenueController, UserController);
        //checks for venue login
        assertThrows(InvalidUsernameException.class, () -> LoginController.login("test11", "testpassword"));
        assertThrows(InvalidPasswordException.class, () -> LoginController.login("test1", "testpassworddd"));
    }

    @Test
    public void 

    @After
    public void tearDown() throws Exception {
        VenueRepository.delete(Venue1);
        VenueRepository.delete(Venue2);
    }
}
