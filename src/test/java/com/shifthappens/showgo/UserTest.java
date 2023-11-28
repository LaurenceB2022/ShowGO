package com.shifthappens.showgo;

import com.shifthappens.showgo.entities.User;
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
public class UserTest {

    User User1= new User("test1", "test1", "testPassword!");
    User User2= new User("test2", "test2", "testPassword!");
    User User3 = new User("test3", "test3", "testPassword!");
    User User4 = new User("ValidUsername", "test3", "Validpassword!");

    @Autowired
    private VenueRepository VenueRepository;
    @Autowired
    private UserRepository UserRepository;

    @Before
    public void setUp() throws Exception {
        
        //save User, verify has Username value after save
        this.UserRepository.save(User1);
        this.UserRepository.save(User2);
        this.UserRepository.save(User3);
        assertNotNull(User1.getUsername());
        assertNotNull(User2.getUsername());
    }
    @Test
    public void testFetchData(){
        /*Test data retrieval*/
        User UserA = UserRepository.findByUsername("test2");
        assertNotNull(UserA);
        assertEquals("test2", UserA.getName());
        User UserB = UserRepository.findByUsername("test1");
        assertNotNull(UserB);
        assertEquals("test1", UserB.getName());
    }

    @Test
    public void testSignUp(){
        UserController UserController = new UserController(UserRepository, VenueRepository);

        User testvalidUser = new User("Validusername","displayname", "Validpassword!");
        assertNotNull(UserController.signUp(testvalidUser));        
        UserRepository.delete(testvalidUser);

        User test1User = mock(User.class);
        when(test1User.getUsername()).thenReturn("invalid username");
        when(test1User.getPassword()).thenReturn("Validpassword!");
        assertThrows(InvalidUsernameException.class, () -> UserController.signUp(test1User));

        User test2User = mock(User.class);
        when(test2User.getUsername()).thenReturn("Validusername");
        when(test2User.getPassword()).thenReturn("invalid password");
        assertThrows(InvalidPasswordException.class, () -> UserController.signUp(test2User));

        assertFalse(UserController.isValidPassword("invalidPassword"));
        assertFalse(UserController.isValidPassword("invalidpassword!"));
        assertTrue(UserController.isValidPassword("validPassword!"));
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
        assertNotNull(LoginController.login("ValidUsername", "Validpassword!"));
    }
    
    @Test
    public void testSettings(){
        UserController UserController = new UserController(UserRepository, VenueRepository);

        User testUser = mock(User.class);
        when(testUser.getUsername()).thenReturn("test1");
        when(testUser.getPassword()).thenReturn("1");
        assertThrows(InvalidPasswordException.class, () -> UserController.editSettings(testUser));

        User User0 = new User("test1", "testDisplay", "testPassword!!!");
        assertNotNull(UserController.editSettings(User0));
    }

    @After
    public void tearDown() throws Exception {
        UserRepository.delete(User1);
        UserRepository.delete(User2);
        UserRepository.delete(User3);
    }

}
