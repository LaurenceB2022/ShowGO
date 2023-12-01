package com.shifthappens.showgo.entities;


import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;
/*
 * The User class is the class that creates a user object and stores that 
 * object in our database 
 */
@Entity
@Data
@Table(name = "users")
public class User {
    @Id
    private String username;
    private String name;
    private String password;
    private String pfp;
    //mapping the users that will be the  blocked users into a set 
    @OneToMany(mappedBy = "user")
    private Set<BlockedUser> blockedVenues = new HashSet<>();
    //Empty method call constructor
    public User(){
    }
    //Constuctor that takes a username, name and password argument
    public User(String username, String name, String password) {
        this.username = username;
        this.name = name;
        this.password = password;
    }
    //Gettor that gets the username
    public String getUsername(){
        return username;
    }
    //Settor that sets the username
    public void setUsername(String username){
        this.username = username;
    }
     //Gettor that gets the name
     public String getName(){
        return name;
    }
    //Settor that sets the name
    public void setName(String name){
        this.name = name;
    }
    //Gettor that gets the password
    public String getPassword(){
        return password;
    }
    //Settor that sets the password
    public void setPassword(String password){
        this.password = password;
    }

    
}
