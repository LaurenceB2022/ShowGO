package com.shifthappens.showgo.exceptions;

public class InvalidUsernameException extends RuntimeException{
    public InvalidUsernameException() {
        super("Invalid username");
    }
}
