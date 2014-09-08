Feature: Search for API from homepage
  In order to search for a certain API
  As a API enthusiast
  I want to see a list of all relevant API's

Scenario: Search for the website
    Given I am on the localhost:3000 homepage
    Then I will search for "et"
    Then I will click Search button
    Then I should see "et"


