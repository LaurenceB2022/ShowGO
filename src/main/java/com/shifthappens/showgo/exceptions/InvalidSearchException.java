package com.shifthappens.showgo.exceptions;

//Thrown for the filter API call when invalid search parameters are given
public class InvalidSearchException extends RuntimeException{
    public InvalidSearchException(String msg) {
        super(msg);
    }
}
