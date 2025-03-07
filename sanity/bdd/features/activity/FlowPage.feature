#flowPage.feature
Feature: Test FlowComponent when "New" Button is Clicked from List Page

  Scenario: Should navigate to FlowComponent when clicking the "New" button
    Given I am on the List Page
    When I click the "New" button
    Then I should be redirected to the FlowComponent page

  Scenario: Should verify nodes and canvas visibility after navigation to FlowComponent
    When I click the "New" button
    Then I should be redirected to the FlowComponent page
    Given I am on the FlowComponent page
    Then I should see the Partner Node in the sidebar
    And I should see the Sponsor Node in the sidebar
    And I should see the canvas

  Scenario: Should drag and drop the Partner Node on the canvas
    When I click the "New" button
    Then I should be redirected to the FlowComponent page
    Given I am on the FlowComponent page
    When I drag and drop the Partner Node on the canvas
    Then the Partner Node should be visible on the canvas

  Scenario: Should drag and drop the Sponsor Node on the canvas
    When I click the "New" button
    Then I should be redirected to the FlowComponent page
    Given I am on the FlowComponent page
    When I drag and drop the Sponsor Node on the canvas
    Then the Sponsor Node should be visible on the canvas

  Scenario: Should connect Partner Node and Sponsor Node with an edge
    When I click the "New" button
    Then I should be redirected to the FlowComponent page
    Given I am on the FlowComponent page
    When I drag and drop the Partner Node on the canvas
    When I drag and drop the Sponsor Node on the canvas
    When I connect the Partner Node and the Sponsor Node
    Then an edge should appear between the nodes

  Scenario: Should delete a node when the "Delete Node" option is clicked in the context menu
    When I click the "New" button
    Then I should be redirected to the FlowComponent page
    Given I am on the FlowComponent page
    When I drag and drop the Partner Node on the canvas
    When I delete the Partner Node
    Then the Partner Node should be removed from the canvas

  Scenario: Should remove edge when one of the connected nodes is deleted
    When I click the "New" button
    Then I should be redirected to the FlowComponent page
    Given I am on the FlowComponent page
    When I drag and drop the Partner Node on the canvas
    When I drag and drop the Sponsor Node on the canvas
    When I connect the Partner Node and the Sponsor Node
    Then an edge should appear between the nodes
    When I delete the Partner Node
    Then the edge should be removed

  Scenario: Should zoom in using the zoom-in
    When I click the "New" button
    Then I should be redirected to the FlowComponent page
    Given I am on the FlowComponent page
    When I drag and drop the Sponsor Node on the canvas
    When I zoom in using the zoom-in
    Then the viewport should be zoomed in

  Scenario: Should zoom out using the zoom-out
    When I click the "New" button
    Then I should be redirected to the FlowComponent page
    Given I am on the FlowComponent page
    When I drag and drop the Sponsor Node on the canvas
    When I zoom out using the zoom-out
    Then the viewport should be zoomed out