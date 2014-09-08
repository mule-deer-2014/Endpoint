
Then(/^I will click Sign Up link$/) do
  click_link('sign-up')
end

Then(/^I should see sign\-up$/) do
  page.should have_content('Submit')
end

Then(/^I should sign up$/) do
  fill_in 'email', :with => "bob.smith@gmail.com"
  fill_in 'password', :with => "12345"
end

Then(/^I will click Submit button$/) do
  click_button('submit')
end
