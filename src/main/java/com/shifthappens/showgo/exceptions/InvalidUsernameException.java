package com.shifthappens.showgo.exceptions;

//Thrown for any API call involving an invalid username
public class InvalidUsernameException extends RuntimeException{
    public InvalidUsernameException() {
        super("Invalid username");
    }
}
