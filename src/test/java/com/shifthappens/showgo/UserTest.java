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
