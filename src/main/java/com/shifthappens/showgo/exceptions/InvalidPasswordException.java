package com.shifthappens.showgo.exceptions;

//Thrown for sign up and log in API calls when an invalid password is given
public class InvalidPasswordException extends RuntimeException {
    public InvalidPasswordException() {
        super("Invalid password");
    }
}
