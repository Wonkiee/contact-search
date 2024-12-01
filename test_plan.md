## **Test Plan**

### **1. Test Plan Overview**

The strategy, goals, scope, and methodology for testing the React application that filters and presents static data are described in this test plan. The main objective is to guarantee that the app's filtering feature functions well, that the user interface is easy to use, and that the app responds appropriately while interacting with the UI elements.

### **2. Test Objectives**

- Verify that the app correctly filters the displayed data based on user input.
- Ensure that the UI renders the filtered results as expected.
- Validate that all UI components are interactive and functional.
- Test edge cases.
- Ensure the app is responsive and works on different screen sizes.

### **3. Test Scope**

- **In Scope:**
  - Functional testing of the filtering mechanism.
  - UI testing to ensure the data is displayed correctly.
  - Edge case handling
  - Responsiveness testing for different screen sizes.
- **Out of Scope:**
  - Backend/API-related functionality (as the app does not interact with APIs right now).
  - Performance testing or load testing (not relevant).

### **4. Test Approach**

The testing approach will be manual testing focused on verifying the core features of the React app using different data sets, inputs, and UI interactions.

### **5. Test Environment**

- **Web Browser:** Google Chrome, Firefox, Safari
- **Operating System:** Windows 10, macOS, Linux
- **Screen Resolutions:** Desktop, Mobile, Tablet
- **Tools:** Browser Developer Tools, React DevTools (for inspecting components)

### **6. Test Scenarios**

#### **Functional Testing**

1. **Verify Data Visualization**

   - **Test Case:** When the app is loaded, ensure all the data are visible (without doing any filteration).
   - **Expected Outcome:** The full dataset is visible.

2. **Verify Data Select**

   - **Test Case:** When a user detail is selected, ensure the relavent user data is displayed under `Selected Contacts`
     .
   - **Expected Outcome:** The full details of the user is visible under `Selected Contacts`.

3. **Verify No Data Select**

   - **Test Case:** When a user detail is not selected, ensure nothing is displayed on under `Selected Contacts`.
   - **Expected Outcome:** Nothing should be visible under `Selected Contacts`.

4. **Verify Filter Functionality (Valid Inputs)**

   - **Test Case:** Enter a valid input in the filter field (e.g., first name, last name, email address), click search and verify that the displayed data is filteration is successfull.
   - **Expected Outcome:** The data should be filtered correctly, according to the filter inputs given.

5. **Verify No Results Handling**

   - **Test Case:** Enter a filter term that matches no items in the dataset and click search.
   - **Expected Outcome:** The app should not show any results.

6. **Verify Clear Filter Functionality**

   - **Test Case:** Clear the filter input and click search, and ensure the app restores back to the full dataset.
   - **Expected Outcome:** After clearing the input and click search, all data items should be displayed.

7. **Verify Verify the Pagination Funtionality**
   - **Test Case:** Include a large dataset and and verify pagination works.
   - **Expected Outcome:** The app should show all the data in pages.

#### **UI Testing**

1. **Verify UI Layout**

   - **Test Case:** Ensure that the layout is consistent (responsive) across different browsers and screen sizes.
   - **Expected Outcome:** The layout should adjust to different screen resolutions (e.g., desktop, mobile, and tablets).

2. **Verify Filter Input Behavior**

   - **Test Case:** Test the filter input field by typing in characters, selecting from dropdowns, and testing edge cases (e.g., empty string, spaces).
   - **Expected Outcome:** The input should correctly filter the data after pressing the Search button.

3. **Verify Data Display Consistency**

   - **Test Case:** Ensure that the displayed data is correctly formatted and all columns or attributes of each item are shown.
   - **Expected Outcome:** Data should be clearly visible, with no missing fields or incorrect formatting.

4. **Verify Button and Control Accessibility**
   - **Test Case:** Ensure all interactive UI components (buttons, input fields, dropdowns etc.) are accessible via keyboard navigation (e.g., `Tab`, `Enter`, and `Esc` keys).
   - **Expected Outcome:** Keyboard navigation should work smoothly, and the app should be fully operatable without a mouse.

#### **Edge Case Testing**

1. **Verify Empty Data Set**

   - **Test Case:** Test with an empty dataset
   - **Expected Outcome:** The app should show no items, without crashing.

2. **Verify Filter Input with Special Characters**

   - **Test Case:** Enter special characters like symbols, punctuation into a filter field and check how the app responds.
   - **Expected Outcome:** The app should handle special characters without breaking the UI.

3. **Verify Case Sensitivity**
   - **Test Case:** Enter search terms with mixed case and check if the filter works as expected.
   - **Expected Outcome:** The filter should be case-insensitive.

#### **Responsiveness Testing**

1. **Verify Mobile View**

   - **Test Case:** Change the size of the browser window to simulate a mobile screen and check the app behaviour.
   - **Expected Outcome:** The layout should adjust itself to suit a smaller screen and the data should still be accessible.

2. **Verify Tablet View**
   - **Test Case:** Change the size of the browser window to simulate a tablet screen and check the app behaviour.
   - **Expected Outcome:** The layout should adjust itself to suit a tablet screen size and the data should still be accessible.

#### **Non-Functional Testing**

1. **Verify Page Load Performance**

   - **Test Case:** Measure the time it takes to load the data to screen when it's first loaded.
   - **Expected Outcome:** The app should load quickly, with a reasonable delay (within a few seconds, depending on the dataset).

2. **Verify Resource Utilization**
   - **Test Case:** Monitor CPU and memory usage while interacting with the app.
   - **Expected Outcome:** The app should not consume excessive resources or cause the browser to freeze or crash.

### **8. Testing Tools**

- **React Testing Library:** For testing React components and ensuring they render and behave correctly.
- **Jest:** For unit and integration testing of JavaScript functionality.
- **Cypress:** For end-to-end testing of UI interactions and ensuring filtering works correctly in real scenarios.

### **9. Testing Schedule**

Testing will be performed iteratively throughout the development lifecycle, with the final test run occurring after development is complete and the app is deployed in a staging environment. Testing should take about 2-3 days for all major scenarios.
