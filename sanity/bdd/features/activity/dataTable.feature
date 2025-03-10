 Feature: DataTable Component

  Scenario: User navigates to the List Page
    Given I am on the Login page
    When I enter valid email and password
    And I click on the login button
    Then I should be redirected to the Activity List page
    Given I am on the List Page
    Then I should see the "Activity Definitions" heading

  Scenario: User searches for a name
    Given I am on the Login page
    When I enter valid email and password
    And I click on the login button
    Then I should be redirected to the Activity List page
    Given I am on the List Page
    When I search for "Activity A"
    Then I should see results that contain "Activity A"

  Scenario: User searches for a name that does not exist
    Given I am on the Login page
    When I enter valid email and password
    And I click on the login button
    Then I should be redirected to the Activity List page
    Given I am on the List Page
    When I search for "Non exist Name"
    Then I should see "No data found."

  Scenario: User clicks on the "New" button
    Given I am on the Login page
    When I enter valid email and password
    And I click on the login button
    Then I should be redirected to the Activity List page
    Given I am on the List Page
    When I click the "New" button
    Then I should be redirected to the FlowComponent page 

  Scenario: User paginates through results
    Given I am on the Login page
    When I enter valid email and password
    And I click on the login button
    Then I should be redirected to the Activity List page
    Given I am on the List Page
    When I select "20" from the items per page dropdown
    Then I should see all available items displayed on the table

  Scenario: User filters by activity status "Draft"
    Given I am on the Login page
    When I enter valid email and password
    And I click on the login button
    Then I should be redirected to the Activity List page
    Given I am on the List Page
    When I select "Draft" from the status filter dropdown
    Then I should see results of status "Draft"

  Scenario: User filters by activity status "Final"
    Given I am on the Login page
    When I enter valid email and password
    And I click on the login button
    Then I should be redirected to the Activity List page
    Given I am on the List Page
    When I select "Final" from the status filter dropdown
    Then I should see results of status "Final"

  Scenario: User combines search and filter by status
    Given I am on the Login page
    When I enter valid email and password
    And I click on the login button
    Then I should be redirected to the Activity List page
    Given I am on the List Page
    When I search for "Activity A" and select "Draft" from the status filter dropdown
    Then I should see results containing "Draft" and of status "Draft"

  Scenario: No matching data found with filter and search
    Given I am on the Login page
    When I enter valid email and password
    And I click on the login button
    Then I should be redirected to the Activity List page
    Given I am on the List Page
    When I search for "Non exist Activity" and select "Draft" from the status filter dropdown
    Then I should see "No data found."

    Scenario: User views more items on the next page
    Given I am on the Login page
    When I enter valid email and password
    And I click on the login button
    Then I should be redirected to the Activity List page
    Given I am on the List Page
    When I click on the "Next page" button
    Then I should see results from the next page

  Scenario: User navigates back to the previous page
    Given I am on the Login page
    When I enter valid email and password
    And I click on the login button
    Then I should be redirected to the Activity List page
    Given I am on the List Page
    When I click on the "Next page" button
    And I click on the "Previous page" button
    Then I should see the previous page items

  Scenario: User marks an activity as Final
    Given I am on the Login page
    When I enter valid email and password
    And I click on the login button
    Then I should be redirected to the Activity List page
    Given I am on the List Page
    When I click on the overflow menu for the first activity
    And I select "Mark as Final" from the overflow menu
    Then A confirmation modal should appear
    When I confirm the action in the modal
    Then The activity should be successfully marked as Final

  Scenario: User cancels marking activity as Final
    Given I am on the Login page
    When I enter valid email and password
    And I click on the login button
    Then I should be redirected to the Activity List page
    Given I am on the List Page
    When I click on the overflow menu for the first activity
    And I select "Mark as Final" from the overflow menu
    Then A confirmation modal should appear
    When I cancel the action in the modal
    Then The activity should not be marked as Final