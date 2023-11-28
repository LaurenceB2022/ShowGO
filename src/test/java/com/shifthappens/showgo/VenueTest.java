package com.shifthappens.showgo;

import com.shifthappens.showgo.entities.Venue;
import com.shifthappens.showgo.exceptions.InvalidPasswordException;
import com.shifthappens.showgo.exceptions.InvalidUsernameException;
import com.shifthappens.showgo.exceptions.InvalidVenueCreationException;
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
    Venue Venue3 = new Venue("test3", "test3", "testPassword!");

    @Autowired
    private VenueRepository VenueRepository;
    @Autowired
    private UserRepository UserRepository;
    
    @Before
    public void setUp() throws Exception {
        
        //save Venue, verify has Username value after save
        this.VenueRepository.save(Venue1);
        this.VenueRepository.save(Venue2);
        this.VenueRepository.save(Venue3);
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
        VenueController VenueController = new VenueController(VenueRepository, UserRepository);
        Venue testvalidUser = new Venue("ValidUsername","displayname", "Validpassword!");
        assertNotNull(VenueController.signUp(testvalidUser));
        VenueRepository.delete(testvalidUser);        

        Venue test1Venue = mock(Venue.class);
        when(test1Venue.getUsername()).thenReturn("test1");
        when(test1Venue.getPassword()).thenReturn("testPassword!");
        assertThrows(InvalidUsernameException.class, () -> VenueController.signUp(test1Venue));

        Venue test2Venue = mock(Venue.class);
        when(test2Venue.getUsername()).thenReturn("tasegddthrsdfbnyts");
        when(test2Venue.getPassword()).thenReturn("1");
        assertThrows(InvalidPasswordException.class, () -> VenueController.signUp(test2Venue));

        assertFalse(VenueController.isValidPassword("invalidPassword"));
        assertFalse(VenueController.isValidPassword("invalidpassword!"));
        assertTrue(VenueController.isValidPassword("validPassword!"));
    }

    @Test
    public void testLogin(){
        VenueController VenueController = new VenueController(VenueRepository, UserRepository);
        UserController UserController = new UserController(UserRepository, VenueRepository);
        LoginController LoginController = new LoginController(VenueController, UserController);
        //checks for venue login
        assertThrows(InvalidUsernameException.class, () -> LoginController.login("invalid username", "Validpassword!"));
        assertThrows(InvalidUsernameException.class, () -> LoginController.login("invalid username", "invalid password"));
        assertThrows(InvalidPasswordException.class, () -> LoginController.login("Validusername", "invalid password"));
        assertNotNull(LoginController.login("Validusername", "Validpassword!"));
    }

    @Test
    public void testSettings(){
        VenueController VenueController = new VenueController(VenueRepository, UserRepository);
        //Security Page
        Venue testVenue = new Venue("test1", "test", "1");
        assertThrows(InvalidPasswordException.class, () -> VenueController.editSettings(testVenue));
        testVenue.setPassword("ValidPassword!");
        assertNotNull(VenueController.editSettings(testVenue));

        //General Page
        Venue test2Venue = mock(Venue.class);
        when(test2Venue.getUsername()).thenReturn("tasegddthrsdfbnyts");
        when(test2Venue.getPassword()).thenReturn("1");
        assertThrows(InvalidUsernameException.class, () -> VenueController.editSettings(test2Venue));

        Venue test3Venue = new Venue("ValidUsername1", "test", "");
        test3Venue.setDescription("");
        assertThrows(InvalidVenueCreationException.class, () -> VenueController.checkParams(test3Venue));
        test3Venue.setLocation("");
        assertThrows(InvalidVenueCreationException.class, () -> VenueController.checkParams(test3Venue));
        Venue Venue0= new Venue("test1", "test0", "testPassword!");
        assertNotNull(VenueController.editSettings(Venue0));
    }

    @Test
    public void testGetEditDeleteTimes() {
        VenueController VenueController = new VenueController(VenueRepository, UserRepository);

        long getStart = System.currentTimeMillis();
        VenueController.findVenue(Venue3.getUsername());
        long getEnd = System.currentTimeMillis();
        assertTrue((getEnd - getStart)/1000 <= 3);

        Venue Venue3Edit = new Venue(Venue3.getUsername(), "new name", "newPassword!");
        long editStart = System.currentTimeMillis();
        VenueController.editSettings(Venue3Edit);
        long editEnd = System.currentTimeMillis();
        assertTrue((editEnd - editStart)/1000 <= 3);

        long deleteStart = System.currentTimeMillis();
        VenueController.deleteVenue(Venue3Edit.getUsername());
        long deleteEnd = System.currentTimeMillis();
        assertTrue((deleteEnd - deleteStart)/1000 <= 3);

    }

    @After
    public void tearDown() throws Exception {
        VenueRepository.delete(Venue1);
        VenueRepository.delete(Venue2);
        VenueRepository.delete(Venue3);
    }
}
