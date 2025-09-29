package com.v1.Email_Writer.Model;

public class EmailRequest {

    public  String  content;
    public  String  tone;

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getTone() {
        return tone;
    }

    public void setTone(String tone) {
        this.tone = tone;
    }

    public EmailRequest(String content, String tone) {
        this.content = content;
        this.tone = tone;
    }

    public EmailRequest() {
    }
}
