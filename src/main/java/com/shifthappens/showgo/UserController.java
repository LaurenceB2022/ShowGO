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

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class UserController {
    
    private final UserRepository userRepo;
    private final VenueRepository venueRepo;

    public UserController(UserRepository userRepo, VenueRepository venueRepo) {
        this.userRepo = userRepo;
        this.venueRepo = venueRepo;
    }

    @GetMapping("/users")
    private List<User> findAll() {
        List<User> users = new ArrayList<User>();
        userRepo.findAll().forEach(user -> users.add(user));
        return users;
    }

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

    @DeleteMapping("/user/{username}")
    public void deleteUser(@PathVariable String username) {
        userRepo.delete(userRepo.findByUsername(username));
    }

    @GetMapping("/user/{username}")
    public User findUser(@PathVariable String username) {
        User user = userRepo.findByUsername(username);
        if (user == null) {
            throw new InvalidUsernameException();
        }
        return user;
    }

    protected boolean isValidPassword(String password) {
        if (password.length() >= 8) {
            Pattern letter = Pattern.compile("[A-Z]");
            Pattern special = Pattern.compile ("[!@#$%&*()_+=|<>?{}\\[\\]~-]");
            Matcher hasLetter = letter.matcher(password);
            Matcher hasSpecial = special.matcher(password);

            return hasLetter.find() && hasSpecial.find();
        }
        else {
            return false;
        }
    }

    protected boolean isValidUsername(String username) {
        return (username != null &&
                !username.isBlank() &&
                !username.contains(" ") && 
                userRepo.findByUsername(username) == null && 
                venueRepo.findByUsername(username) == null &&
                username.length() <= 20) ;
    }

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