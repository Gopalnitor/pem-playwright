# # #nodeDefinition.feature
Feature: Test Node Definition Form when Node is Clicked from FlowComponent

  Scenario: Should open Definition form on node click
    Given I am on the Login page
    When I enter valid email and password
    And I click on the login button
    Then I should be redirected to the Activity List page
    When I click the "New" button
    Then I should be redirected to the FlowComponent page
    # Then I should see the Partner Node in the sidebar
    # And I should see the Sponsor Node in the sidebar
    # And I should see the canvas
    # When I drag and drop the Partner Node on the canvas
    # Then the Partner Node should be visible on the canvas
    # When I drag and drop the Sponsor Node on the canvas
    # And I should see the Sponsor Node in the sidebar
