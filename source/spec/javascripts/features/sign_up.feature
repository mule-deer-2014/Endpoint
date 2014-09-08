Feature: Perform search function from homepage

Scenario: Search for the website
    Given I am on the localhost:3000 homepage
    Then I will click Sign Up link
    Then I should see "SIGN UP"
