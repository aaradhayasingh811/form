$(document).ready(function() {
    let contacts = [];
  
    $("#form").submit(function(e) {
      e.preventDefault();
  
      let fname = $("#fname").val();
      let lname = $("#lname").val();
      let name=fname+" "+lname; 
      let contact = $("#contact").val();
  
      // Check for duplicates
      let duplicate = contacts.find(c => c.name === name || c.contact === contact);
      if (duplicate) {
        alert("Name or contact number already exists!");
        return;
      }
  
      // Add to contacts array
      contacts.push({ name, contact });
  
      // Populate table
      populateTable();
  
      // Clear form inputs
      $("#fname").val("");
      $("#lname").val("");
      $("#contact").val("");
    });
  
    $("#search").on("input", function() {
      let searchTerm = $(this).val();
      let filteredContacts = contacts.filter(c => c.name.includes(searchTerm));
  
      // Populate table with filtered contacts
      populateTable(filteredContacts);
    });
  
    $("#sor").click(function() {
      // Sort contacts by name
      contacts.sort((a, b) => (a.name > b.name ? 1 : -1));
  
      // Populate table with sorted contacts
      populateTable();
    });
  
    function populateTable(data = contacts) {
      let tableBody = $("#tableBody");
      tableBody.empty();
  
      data.forEach((c, index) => {
        let row = $("<tr>");
  
        // Serial number column
        let serialNo = $("<td>").text(index + 1);
  
        // Name column
        let name = $("<td>").text(c.name);
  
        // Contact number column
        let contact = $("<td>").text(c.contact);
  
        // Action column
        let actions = $("<td>");
        let deleteButton = $("<button>").text("Delete").click(function() {
          if (confirm("Are you sure you want to delete this contact?")) {
            let index = contacts.findIndex(con => con.name === c.name && con.contact === c.contact);
            contacts.splice(index, 1);
            populateTable();
          }
        });
        actions.append(deleteButton);
  
        row.append(serialNo, name, contact, actions);
        tableBody.append(row);
      });
    }
  });
