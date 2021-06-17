var searches = [];
var employeeID = $("autocomplete-input").val();



$(document).ready(function () {
    var employees = [];
    var sorted_employees = [];
    let answer;

    $("#id-btn").on("click", function (event) {
        event.preventDefault();
        var employeeSearch = $("#id-input").val().trim();
        idSearch(employeeSearch);
    })
    //Set the actions to be taken when the search button is clicked
    function idSearch(employeeID) {

        //Set the ajax for the employeeID api to be grabbed
        $.ajax({
            method: "GET",
            url: "http://dummy.restapiexample.com/api/v1/employee/" + employeeID,
        })

        .then(function(data){


            //define what the code should do if the search is not valid
                if (data.data == null) {
                    answer = "Invalid Employee"
                }
            //define the employee's name as a variable based on the api return
                else {
                    employeeName = data.data.employee_name;
                    stringedEmployeeName = JSON.stringify(employeeName);

            //check the first letter of the Employee's name
                    letter = stringedEmployeeName.charAt(1);


                    if ((letter != "A") && (letter != "E") && (letter != "I") && (letter != "O") && (letter != "U")) {
                        answer = "Employee's name does not begin with a vowel."
                    }
                    else {
                        answer = employeeName;
                    }
                }})





                //insert the employee's name into the body below the search bar
        
            .then(function () {
                $("#search_column").empty();

                var employee_letter = $("<div>");
                employee_letter.addClass("div-body");


                var letterOutput = $("<h5>").text(answer);
                letterOutput.addClass("card-title");

                employee_letter.append(letterOutput);

                $("#search_column").append(employee_letter);
            })}

            //search on site load for employees matching specific criteria
    $.ajax({
        method: "GET",
        url: "http://dummy.restapiexample.com/api/v1/employees",
        success: function (data) {
            employees = data.data.map(function (employee) {
                return {
                    id: employee.id,
                    name: employee.employee_name,
                    salary: employee.employee_salary,
                    age: employee.employee_age,


                }
            })
        }
    })

            //function to define the criteria of employee's to pull being between ages 22-28 and making over 1000
        .then(function () {


            for (i = 0; i < employees.length; i++) {

                if (employees[i].age > 21 && employees[i].age < 29 && employees[i].salary > 1000) {
                    sorted_employees.push(employees[i]);
                }

            }
        })

        //Sort the results by salary in descending order
        .then(function () {
            sorted_employees.sort(function (a, b) {
                if (a.salary < b.salary)
                    return 1;
                else if (a.salary > b.salary)
                    return -1;
                else
                    return 0;
            })


        }
        )
        //List the results on the page
        .then(function () {
            for (i = 0; i < sorted_employees.length; i++) {

                var employeeDiv = $("<div>");
                employeeDiv.addClass("card-body");
                var cardDiv = $("<div>");
                cardDiv.addClass("card2 card");

                var sorted_name = sorted_employees[i].name;
                var sorted_id = sorted_employees[i].id;
                var sorted_salary = sorted_employees[i].salary;
                var sorted_age = sorted_employees[i].age;


                var nameOutput = $("<h5>").text("Name: " + sorted_name);
                nameOutput.addClass("card-title");
                var idOutput = $("<p>").text("ID: " + sorted_id);
                idOutput.addClass("card-text");
                var salaryOutput = $("<p>").text("Salary: $" + sorted_salary);
                salaryOutput.addClass("card-text");
                var ageOutput = $("<p>").text("Age: " + sorted_age);
                ageOutput.addClass("card-text")

                employeeDiv.append(nameOutput);
                employeeDiv.append(idOutput);
                employeeDiv.append(salaryOutput);
                employeeDiv.append(ageOutput);

                cardDiv.append(employeeDiv);
                $("#employees").append(employeeDiv);
            }

        })
})