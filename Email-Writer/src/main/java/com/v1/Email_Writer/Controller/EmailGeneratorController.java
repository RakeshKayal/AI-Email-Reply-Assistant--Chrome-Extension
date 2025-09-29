package com.v1.Email_Writer.Controller;

import com.v1.Email_Writer.Model.EmailRequest;
import com.v1.Email_Writer.Service.EmailGeneratorService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email/v1")
@CrossOrigin(origins = "*")
public class EmailGeneratorController {

    @Autowired
    EmailGeneratorService emailGeneratorService;

    @PostMapping("/generate")
    public ResponseEntity<String> generateEmail(@RequestBody EmailRequest emailRequest) {
        String response = emailGeneratorService.generateEmailReply(emailRequest);
        return ResponseEntity.ok(response);
    }
}
