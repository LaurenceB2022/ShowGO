package com.shifthappens.showgo.exceptions;

//Thrown for API calls where an Event is created with invalid settings
public class InvalidEventCreationException extends RuntimeException{
    public InvalidEventCreationException(String msg) {
        super(msg);
    }
}
