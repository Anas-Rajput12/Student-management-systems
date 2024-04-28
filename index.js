#!  /usr/bin/env node
import inquirer from "inquirer";
const randomNumber = Math.floor(10000 + Math.random() * 90000);
let myBalance = 0;
async function data() {
    let student = true;
    do {
        const answer = await inquirer.prompt([
            {
                name: "students",
                type: "input",
                message: "Enter the number of students",
                validate: function (value) {
                    if (value.trim() !== "") {
                        return true;
                    }
                    return "Please enter a non-empty value.";
                },
            },
            {
                name: "courses",
                type: "list",
                message: "Select the name of the course",
                choices: ["C++", "Java", "Python", "JavaScript", "TypeScript", "ReactJS"],
            },
        ]);
        let tuitionFee = {
            "C++": 5000,
            "Java": 4000,
            "Python": 3000,
            "JavaScript": 2000,
            "TypeScript": 1000,
            "ReactJS": 500,
        };
        console.log(`\nTuition Fees : ${tuitionFee[answer.courses]}\n`);
        console.log(`Balance : ${myBalance}\n`);
        let paymentType = await inquirer.prompt([
            {
                name: "payment",
                type: "list",
                message: "Select the payment method",
                choices: ["Bank Transfer", "JazzCash", "EasyPaisa"],
            },
            {
                name: "amount",
                type: "number",
                message: "Enter the payment amount",
                validate: function (value) {
                    const isValid = !isNaN(parseFloat(value)) && isFinite(value);
                    return isValid ? true : "Please enter a valid number.";
                },
            },
        ]);
        const courseFee = tuitionFee[answer.courses];
        const selectedAmount = parseFloat(paymentType.amount);
        if (selectedAmount >= courseFee) {
            myBalance = selectedAmount - courseFee;
            console.log(`\nPayment successful. Balance updated: ${myBalance}\n`);
            let ans = await inquirer.prompt([
                {
                    name: "select",
                    type: "list",
                    message: "What would you like to do next?",
                    choices: ["view status", "Exit"],
                }
            ]);
            if (ans.select === "view status") {
                console.log("\n************Status************\n");
                console.log(`Student Name: ${answer.students}`);
                console.log(`Student ID: ${randomNumber}`);
                console.log(`Course Name: ${answer.courses}`);
                console.log(`Tuition Fees Method: ${selectedAmount}`);
                console.log(`Balance: ${myBalance += selectedAmount}`);
            }
            else {
                console.log("Exiting Student Management System\n");
            }
        }
        else {
            console.log("\nInsufficient payment amount. Payment failed.\n");
        }
        console.log(`You selected payment method ${paymentType.payment}\n`);
        const { studentData } = await inquirer.prompt([
            {
                name: "studentData",
                type: "confirm",
                message: "Funther check your Transaction ?",
                default: true
            }
        ]);
        student = studentData;
    } while (student);
}
data();
