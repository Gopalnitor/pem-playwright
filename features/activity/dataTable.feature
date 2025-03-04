Feature: DataTable  Component
 
  Scenario: User navigates to the List Page
    Given I am on the List Page
    Then I should see the "Activity List" heading
 
  Scenario: User searches for a name
    Given I am on the List Page
    When I search for "Partner A"
    Then I should see results that contain "Partner A"
 
  Scenario: User clicks on the "New" button
    Given I am on the List Page
    When I click on the "New" button
    Then I should be redirected to the "/flow" page