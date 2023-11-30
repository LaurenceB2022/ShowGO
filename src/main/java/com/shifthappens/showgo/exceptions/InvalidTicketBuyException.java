package com.shifthappens.showgo.exceptions;

public class InvalidTicketBuyException extends RuntimeException{
    public InvalidTicketBuyException(String msg) {
        super(msg);
    }
}