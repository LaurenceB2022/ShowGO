package com.shifthappens.showgo.exceptions;

//Thrown for any API call where a ticket is created with invalid conditions
public class InvalidTicketBuyException extends RuntimeException{
    public InvalidTicketBuyException(String msg) {
        super(msg);
    }
}