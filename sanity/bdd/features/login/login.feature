Feature: Login

  Scenario: User navigates to the Login Page
    Given I am on the Login page
    Then I should see the "Login" text

  Scenario: Login with valid credentials
    Given I am on the Login page
    When I enter valid email and password
    And I click on the login button
    Then I should be redirected to the Activity List page

  Scenario: Login with valid credentials
    Given I am on the Login page
    When I click on the login button
    Then I should see an email error message "Email address is required"
    And I should see a password error message "Password is required"
    When I enter valid email and password
    And I click on the login button
    Then I should be redirected to the Activity List page
