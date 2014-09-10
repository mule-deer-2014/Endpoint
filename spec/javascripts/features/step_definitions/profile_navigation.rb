Given(/^I am on the search results page$/) do
  visit 'http://localhost:3000/#search=et'
end

Then(/^I will click on the API I want$/) do
  page.first("#link").click
end