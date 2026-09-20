package com.Spa_website.Backend.service;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import lombok.RequiredArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SmsService {

    private final Environment env;

    public void sendOtpSms(String phoneNumber, String otpCode){

        String accountSid = env.getProperty("twilio.account-sid");
        String authToken = env.getProperty("twilio.auth-token");
        String twilioNumber = env.getProperty("twilio.phone-number");

        if (accountSid == null || authToken == null || twilioNumber == null){
            throw new IllegalStateException("Twilio configuration is missing");
        }

        Twilio.init(accountSid, authToken);

        Message.creator(
                new PhoneNumber(phoneNumber),
                new PhoneNumber(twilioNumber),
                "sms_2fa"
        ).create();

    }
}
