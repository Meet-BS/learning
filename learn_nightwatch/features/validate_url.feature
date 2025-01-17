Feature: Ultimate QA

    # Scenario: Validate link
    #     Given I open the ultimateqa website link
    #     When I navigate to the "Fake Landing Page" 
    #     Then I get the page title

    Scenario: 
        Given I open the ultimateqa website link
        When I navigate to the "Big page with many elements" 
        Then From the button group I Click on button "1"
        Then From the button group I Click on button "random"