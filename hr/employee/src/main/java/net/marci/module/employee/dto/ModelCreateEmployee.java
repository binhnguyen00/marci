package net.marci.module.employee.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

import java.time.LocalDate;
import java.util.regex.Pattern;

@Slf4j
@Setter @Getter @NoArgsConstructor
public class ModelCreateEmployee {

  private String userName;
  private String password;

  private String fullName;
  private String nickName;
  private String email;
  private String phoneNumber;
  private LocalDate dateOfBirth;

  private String countryCode;
  private String stateCode;
  private String cityCode;
  private String address;

  private String departmentCode;
  private String positionCode;


  public String setEmail(String email) {
    checkValidEmail(email);
    if (email.isEmpty()) {
      this.email = null;
      return null;
    }
    this.email = email.trim().toLowerCase();
    return email;
  }

  private void checkValidEmail(String token) {
    final String PATTERN = "^[a-zA-Z0-9_!#$%&’*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$"; // Regular Expression by RFC 5322
    if (!checkValidEmail(token, PATTERN)) {
      log.warn("Invalid Email: {}", token);
      final String errorMessage = """
      [Local]
        - It allows numeric values from 0 to 9.
        - Both uppercase and lowercase letters from a to z are allowed.
        - Allowed are underscore `_`, hyphen `-`, and dot `.`
        - Dot isn’t allowed at the start and end of the local part.
        - Consecutive dots aren’t allowed.
        - For the local part, a maximum of 64 characters are allowed.
      [Domain]
        - It allows numeric values from 0 to 9.
        - We allow both uppercase and lowercase letters from a to z.
        - Hyphen `-` and dot `.` aren’t allowed at the start and end of the domain part.
        - No consecutive dots.
      """;
      throw new RuntimeException(errorMessage);
    }
  }

  private boolean checkValidEmail(String token, String regexPattern) {
    return Pattern.compile(regexPattern)
      .matcher(token)
      .matches();
  }

  public String setPhoneNumber(String phoneNumber) {
    if (!checkValidPhoneNumber(phoneNumber)) {
      log.warn("Invalid Phone Number: {}", phoneNumber);
      throw new RuntimeException("Invalid Phone Number");
    }
    if (phoneNumber.isEmpty()) {
      this.phoneNumber = null;
      return null;
    }
    this.phoneNumber = phoneNumber.trim();
    return this.phoneNumber;
  }

  private boolean checkValidPhoneNumber(String token) {
    final String PATTERN = "^[0-9]*$";
    return Pattern.compile(PATTERN)
      .matcher(token)
      .matches();
  }
}