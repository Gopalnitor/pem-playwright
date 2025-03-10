Feature: Login

  Scenario: User navigates to the Login Page
    Given I am on the Login page
    Then I should see the "Login" text

  Scenario: Login with valid credentials
    Given I am on the Login page
    Then I should see the "Login" text
    When I enter valid email and password
    And I click on the login button
    Then I should be redirected to the Activity List page
