package com.shifthappens.showgo;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.shifthappens.showgo.entities.User;
import com.shifthappens.showgo.exceptions.InvalidPasswordException;
import com.shifthappens.showgo.exceptions.InvalidUsernameException;
import com.shifthappens.showgo.repositories.UserRepository;
import com.shifthappens.showgo.repositories.VenueRepository;

/*
 * UserController file is what we used to store and move the data storage in our mvc app
 * this controller releys information and date in between the mvc application. 
 */

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class UserController {
    //fields in the UserController class
    private final UserRepository userRepo;
    private final VenueRepository venueRepo;
     //UserController constructor that takes a UserRepository and VenueRepository parameters
    public UserController(UserRepository userRepo, VenueRepository venueRepo) {
        this.userRepo = userRepo;
        this.venueRepo = venueRepo;
    }
    //finds all the sers in the db and puts them in a list
    @GetMapping("/users")
    private List<User> findAll() {
        List<User> users = new ArrayList<User>();
        userRepo.findAll().forEach(user -> users.add(user));
        return users;
    }
    //Sees if a user signing up is using a valid username and password
    @PostMapping("/users")
    public User signUp(@RequestBody User user) {
        if (!isValidUsername(user.getUsername())) {
            throw new InvalidUsernameException();
        }
        if (!isValidPassword(user.getPassword())) {
            throw new InvalidPasswordException();
        }
        return userRepo.save(user);

    }
    //Deletes the user by finding them by user username
    @DeleteMapping("/user/{username}")
    public void deleteUser(@PathVariable String username) {
        userRepo.delete(userRepo.findByUsername(username));
    }
    //Gets and finds all the Users by user username 
    @GetMapping("/user/{username}")
    public User findUser(@PathVariable String username) {
        User user = userRepo.findByUsername(username);
        if (user == null) {
            throw new InvalidUsernameException();
        }
        return user;
    }
    //Checking to see if the password falls into a valid password range
    protected boolean isValidPassword(String password) {
        if (password.length() >= 8) {
            Pattern letter = Pattern.compile("[A-Z]");
            Pattern special = Pattern.compile ("[!@#$&*()_+=|<>?{}\\[\\]~-]");
            Matcher hasLetter = letter.matcher(password);
            Matcher hasSpecial = special.matcher(password);

            return hasLetter.find() && hasSpecial.find();
        }
        else {
            return false;
        }
    }
    //Checking to see if a username is a valid username and falls in the correct range
    protected boolean isValidUsername(String username) {
        return (username != null &&
                !username.isBlank() &&
                !username.contains(" ") && 
                userRepo.findByUsername(username) == null && 
                venueRepo.findByUsername(username) == null &&
                username.length() <= 20) ;
    }
    //Tests the edit user settings 
    @PostMapping("/user/settings")
    public User editSettings(@RequestBody User user) {
        if (userRepo.findByUsername(user.getUsername()) == null) {
            throw new InvalidUsernameException();
        }
        if (!isValidPassword(user.getPassword())) {
            throw new InvalidPasswordException();
        }
        return userRepo.save(user);
    }

}