showNavbar()

function showNavbar() {
    let makeTheNavbar = makeNavbar()
    let navbar = document.getElementById('navbar')
    navbar.innerHTML = makeTheNavbar
}

function makeNavbar() {
    let navbar = `                
                 <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                 <div class="container-fluid">
                     <a class="navbar-brand">Employee System</a>
                     <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                         data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                         aria-label="Toggle navigation">
                         <span class="navbar-toggler-icon"></span>
                     </button>
                     <div class="collapse navbar-collapse" id="navbarSupportedContent">
                         <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                 <li class="nav-item hv">
                                     <a class="nav-link active" aria-current="page" onclick="showEmployees()">Show Employees</a>
                                 </li>
                                 <li class="nav-item hv">
                                     <a class="nav-link active" aria-current="page" onclick="AddEmployee()">Add an Employee</a>
                                 </li>
                                 <li class="nav-item hv">
                                     <a class="nav-link active" aria-current="page" onclick="showDepartements()">Departements</a>
                                 </li>
                                 <li class="nav-item hv">
                                     <a class="nav-link active" aria-current="page" onclick="AddDepartements()">Add a Departements</a>
                                 </li>
                                 <li class="nav-item hv">
                                     <a class="nav-link active" aria-current="page" onclick="showExpenses()">Expenses</a>
                                 </li>
                                 <li class="nav-item hv">
                                     <a class="nav-link active" aria-current="page" onclick="AddAnExpense()">Add an Expense</a>
                                 </li>
                         </ul>
                     </div>
                 </div>
                 </nav>
               `
    return navbar
}


let Employees = [
    { name: 'Anna', email: 'Anna45@email.com', age: 27, dept: 'Technology', gradCourse: 'B.Tech', gradYear: 2015, gradPerf: 'Good', postgrad: false, workBefore: true, workEx: '0-1 year' },
    { name: 'John', email: 'john@email.com', age: 24, dept: 'Technology', gradCourse: 'B.Tech', gradYear: 2015, gradPerf: 'Good', postgrad: false, workBefore: false, workEx: 'None' },
    { name: 'Edwards', email: 'edwards@email.com', age: 29, dept: 'Accounts', gradCourse: 'B.Com', gradYear: 2015, gradPerf: 'Excellent', postgrad: true, workBefore: true, workEx: '3+ years' },
    { name: 'Julia', email: 'julia@email.com', age: 28, dept: 'Technology', gradCourse: 'B.Tech', gradYear: 2015, gradPerf: 'Excellent', postgrad: true, workBefore: true, workEx: '1-3 years' }
]



//Departement Array

let emDept = ['HR', 'Accounts', 'Operations', 'Technology']

let Experience = ['None', '0-1 year', '1-3 years', '3+ years']

let EmpDetailsForEdit = {}

let editIndex = -1

let ErrorDetails = {}


function showEmployees() {
    let show = document.getElementById('show')
    show.innerHTML = ''

    let insertTable = document.getElementById('insertTable')
    let showTheTable = showTable()
    insertTable.innerHTML = showTheTable
}

function showTable() {
    const mainHeading = `<h1 class="text-center">List Of Product</h1>`
    const tableHeading = `
                        <thead class="table-dark">
                             <tr>
                                 <th scope="col">Name</th>
                                 <th scope="col">Email</th>
                                 <th scope="col">Age</th>
                                 <th scope="col">Departements</th>
                                 <th scope="col">Graduation</th>
                                 <th scope="col">Work-Exp</th>
                                 <th></th>
                             </tr>
                         </thead>
                          `
    const tableBody = Employees.map((Emp, index) => {
        const { name, email, age, dept, gradCourse, workEx } = Emp
        return `
                <tr>
                    <td>${name}</td>
                    <td>${email}</td>
                    <td>${age}</td>
                    <td>${dept}</td>
                    <td>${gradCourse}</td>
                    <td>${workEx}</td>
                    <td id="a">
                    <button type="button" class="btn btn-secondary">
                       <i class="fas fa-edit" style="font-size:20px;"onclick="EditEmp(${index})"></i>
                    </button>
                    <button type="button" class="btn btn-danger">
                       <i class="fas fa-trash-alt" style="color:white;font-size:20px;" onclick="delteEmp(${index})"></i>
                    </button>
                    <button type="button" class="btn btn-warning">
                       <i class="fas fa-car" style="color:black;font-size:20px;" onclick="showExpenseOfEmp('${name}')"></i>
                    </button>
                   
                    </td>
                  
                </tr>
                `
    })

    let changeView = `<button type="submit"  class="btn btn-primary" onclick="changeView()">Change View</button>`

    return `${mainHeading} <table class="table  table-hover">${tableHeading}<tbody>${tableBody.join('')}</tbody></table>${changeView}`
}


function AddEmployee() {
    let insertTable = document.getElementById('insertTable')
    insertTable.innerHTML = ''

    let { name = '', email = '', age = '', dept = '', gradCourse = '', gradYear = '', gradPerf = '', postgrad = '', workBefore = '', workEx = '' } = EmpDetailsForEdit

    let Ename = makeTextField("ename", "Employee Name", "Enter Employee Name", name, ErrorDetails.name)
    let Eemail = makeTextField("email", "Email", "Enter Email", email, ErrorDetails.email)
    let Eage = makeTextField("age", "Age", "Enter Age", age, ErrorDetails.age)
    let makeTheDropDown = makeDropDown('dpDown', emDept, 'Select The Departements', dept, ErrorDetails.dept)
    let graduationDegree = makeTextField("gradDegree", "Graduation Degree", 'What degree did you get in graduation', gradCourse, ErrorDetails.gradCourse)
    let graduationYearDpDown = gradYearDpDown('gradYear', 'Select The Graduation Year', gradYear, ErrorDetails.gradYear)
    let graduationGradeRadio = gradGradeRadio('Overall grade in Graduation', 'grdRadio', gradPerf, ErrorDetails.gradPerf)
    let checkPostGraduate = makeCheckBoxForChecking('Are You a Post Graduate', 'postGrad', postgrad)
    let checkForWorkExp = makeCheckBoxForChecking('Do You have any prior Work Exp', 'workExp', workBefore)
    let totalWorkExp = workExpRadio('Years Of Work Exp', 'totalWrkexp', Experience, workEx, ErrorDetails.workEx)

    let submitBtn = `<button type="submit"  class="btn btn-primary fix-size" onclick="submitForm()">Submit</button>`

    let completeForm = `${Ename}${Eemail}${Eage}${makeTheDropDown}${graduationDegree}${graduationYearDpDown}${graduationGradeRadio}${checkPostGraduate}${checkForWorkExp}${totalWorkExp}${submitBtn}`
    let show = document.getElementById('show')
    show.innerHTML = completeForm

}

//Also Edit name,email,age,and graduationDegree 

function makeTextField(id, label, placeholder = '', edit = '', err = '') {

    let disabled = (editIndex >= 0 && id === 'ename') ? 'readonly' : ''

    let str1 = err ? `<span class="text-danger size">${err}</span>` : ''

    let textField = `
                     <div class="mb-3 fix-size">
                       <label>${label}</label>
                            <input placeholder="${placeholder}" type="text" class="form-control" id="${id}" value="${edit}" ${disabled} required">
                            ${str1}
                      </div>
                   `
    return textField
}

function makeDropDown(id, depArr, header, EditDept = '', err = '') {

    let str1 = err ? `<span class="text-danger size">${err}</span>` : ''

    let dpDownBody = depArr.map(opt => {
        let selected = (opt === EditDept) ? 'selected' : ''
        return `<option value="${opt}" ${selected}>${opt}</option>`
    })

    let selectedHeader = (EditDept == '') ? 'selected' : ''

    let dpheader = `<option disabled ${selectedHeader}>${header}</option>`

    let cmpltDpDown = `
                   <div class="form-group fix-size" >
                       <select id="${id}" class="form-control">
                           ${dpheader}
                           ${dpDownBody.join('')}
                       <select>
                       ${str1}
                   </div> `

    return `${cmpltDpDown}`
}

function gradYearDpDown(id, header, EditGradYear = '', err = '') {

    //console.log('EditGradYear =  ' + EditGradYear)

    let str1 = err ? `<span class="text-danger size">${err}</span>` : ''

    let dpDownBody = ''
    for (let i = 2000; i <= 2020; i++) {
        let selected = (i === EditGradYear) ? 'selected' : ''
        dpDownBody += `<option value="${i}" ${selected}>${i}</option>`
    }

    let selectedHeader = (EditGradYear == '') ? 'selected' : ''

    let dpheader = `<option disabled ${selectedHeader}>${header}</option>`

    let cmpltDpDown = `
                   <div class="form-group fix-size" >
                       <select id="${id}" class="form-control">
                           ${dpheader}
                           ${dpDownBody}
                       <select>
                       ${str1}
                   </div> `

    return cmpltDpDown
}

const grades = [
    { display: 'Excellent', value: 'A' },
    { display: 'Good', value: 'B' },
    { display: 'Average', value: 'C' },
    { display: 'Poor', value: 'D' }
]


function gradGradeRadio(label, name, EditGradPerf, err = '') {
    let str1 = err ? `<span class="text-danger size">${err}</span>` : ''

    let str = grades.map(gd => {

        const { display, value } = gd

        let checked = (display === EditGradPerf) ? 'checked' : ''

        return `
               <div class="form-check form-check-inline">
                   <input class="form-check-input" type="radio" name="${name}"  value="${value}"  ${checked}>
                   <label class="form-check-label">
                       ${value}
                   </label>
               </div>
               `
    })

    let labelHd = ` <div class="form-check form-check-inline ">
                       <label class="form-check-label">
                           ${label}:
                       </label>
                    </div>
                 `
    return `${labelHd}${str.join('')}${str1}`
}

//To check Employee is post graduate or not and he did Works before or not

function makeCheckBoxForChecking(label, id, Editdtls) {
    let checked = (Editdtls) ? 'checked' : ''
    return `
           <div class="form-check fix-size">
              <input class="form-check-input" type="checkbox" value="" id="${id}" ${checked}>
              <label class="form-check-label" for="${id}">
                 ${label}
              </label>
          </div>
           `
}


function workExpRadio(label, name, Exp, EditWorkEx, err = '') {

    let str1 = err ? `<span class="text-danger size">${err}</span>` : ''

    let radioBody = Exp.map(opt => {
        let checked = (opt === EditWorkEx) ? 'checked' : ''
        return `   
             <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="${name}"  value="${opt}" ${checked}>
                <label class="form-check-label">
                   ${opt}
                </label>
             </div>
               `
    })

    let labelHd = ` <div class="form-check form-check-inline ">
                       <label class="form-check-label">
                           ${label}:
                       </label>
                    </div>
                 `
    return `${labelHd}${radioBody.join('')}${str1}`
}



function submitForm() {
    let eName = document.getElementById('ename').value
    let email = document.getElementById('email').value
    let age = document.getElementById('age').value
    let dept = document.getElementById('dpDown').value
    let gradCourse = document.getElementById('gradDegree').value
    let gradYear = document.getElementById('gradYear').value
    let gradPerference = document.getElementsByName('grdRadio')

    let value = ''
    for (let i = 0; i < gradPerference.length; i++) {
        if (gradPerference[i].checked) {
            value = gradPerference[i].value
        }
    }

    let gradPerf = ''
    if (value === 'A') {
        gradPerf = 'Excellent'
    } else if (value === 'B') {
        gradPerf = 'Good'
    } else if (value === 'C') {
        gradPerf = 'Average'
    } else if (value === 'D') {
        gradPerf = 'Poor'
    }


    let postgrad = document.getElementById('postGrad').checked

    let workBefore = document.getElementById('workExp').checked

    let workExperience = document.getElementsByName('totalWrkexp')


    let workEx = ''
    for (let i = 0; i < workExperience.length; i++) {
        if (workExperience[i].checked) {
            workEx = workExperience[i].value
        }
    }

    let newEmp = {}
    newEmp.name = eName
    newEmp.email = email
    newEmp.age = age
    newEmp.dept = dept
    newEmp.gradCourse = gradCourse
    newEmp.gradYear = gradYear
    newEmp.gradPerf = gradPerf
    newEmp.postgrad = postgrad
    newEmp.workBefore = workBefore
    newEmp.workEx = workEx


    if (validateForm(newEmp)) {
        if (editIndex >= 0) {
            Employees[editIndex] = newEmp
        } else {
            Employees.push(newEmp)
        }
        showEmployees()
    } else {
        EmpDetailsForEdit = newEmp
        AddEmployee()
    }
}


//Validate The Employees
function validateForm(newEmp) {

    //Validate Employee Name
    ErrorDetails.name = (newEmp.name) ? '' : 'Name is Mandatory'
    if (ErrorDetails.name === '' && Number(newEmp.name)) {
        ErrorDetails.name = 'name should be string'
    }

    ErrorDetails.email = (newEmp.email) ? '' : 'Email is Mandatory'

    //validate Employee Age
    ErrorDetails.age = (newEmp.age) ? '' : 'Age is mandatory'
    if (ErrorDetails.age === '' && !Number(newEmp.age)) {

        if (newEmp.age <= 0) {
            ErrorDetails.age = 'Plz Enter Valid Age'
        } else {
            ErrorDetails.age = 'Age Should Be a Number'
        }
    }

    //Validate The Departement
    let index
    index = emDept.findIndex(dp => newEmp.dept === dp)
    ErrorDetails.dept = (index === -1) ? 'Select The Departement' : ''

    //Validate The Grad Course
    ErrorDetails.gradCourse = (newEmp.gradCourse) ? '' : 'Graduation is Mandatory'

    //Validate The Graduation Grade
    ErrorDetails.gradPerf = (newEmp.gradPerf) ? '' : 'Select The Graduation Performance'

    //Validate The Graduation year
    ErrorDetails.gradYear = (+newEmp.gradYear) ? '' : 'Select The Graduation Year'


    ErrorDetails.workEx = (newEmp.workEx) ? '' : 'Choose the applicalble Work Experience'


    return !(ErrorDetails.name || ErrorDetails.gradCourse || ErrorDetails.email || ErrorDetails.age || ErrorDetails.dept || ErrorDetails.workEx)
}



//Delete Employees
function delteEmp(index) {
    Employees.splice(index, 1)
    showEmployees()
}

//Edit  Employees
function EditEmp(index) {
    EmpDetailsForEdit = Employees[index]
    editIndex = index
    AddEmployee()
}


//#########################################---------Deptartment Section------------------######################################

let departements = []

function showDepartements() {
    let insertTable = document.getElementById('insertTable')
    insertTable.innerHTML = ''

    if (departements.length === 0) {
        document.getElementById('show').innerHTML = '<h3>No Departments has Been Defined</h3>'
    } else {
        let depInfo = departements.map((dep) => {
            return `<tr>
                        <td>
                          ${dep}
                        </td>
                    </tr>`
        })

        let heading = `<h2 align="center">List Of Departements</h2>`
        let show = document.getElementById('show')
        let cmpltList = `${heading}<table class="table  table-hover"><tbody>${depInfo.join('')}</tbody></table>`
        show.innerHTML = cmpltList
    }
}

function AddDepartements() {
    let insertTable = document.getElementById('insertTable')
    insertTable.innerHTML = ''

    let depName = makeTextField('dpname', 'Name of the Departement', 'Enter The Departements Name')

    let sbtBtn = `<button onclick="sbmtValue(this)" class="btn btn-primary fix-size">Submit</button>`
    let show = document.getElementById('show')
    show.innerHTML = depName + sbtBtn
}

function sbmtValue(elem) {
    let dep = document.getElementById('dpname')
    departements.push(dep.value)
    showDepartements()
}

function changeView() {
    let chngView = changeTheView()
    let insertTable = document.getElementById('insertTable')
    insertTable.innerHTML = chngView
}


//--###################################################-----Expense Section-------#############################################---

let Expenses = [
    { name: 'John', category: 'Local Travel', billId: 'NP7561', amount: 64, payment: 'Self', approved: true },
    { name: 'Anna', category: 'Communication', billId: 'BN8561', amount: 39, payment: 'Self', approved: false },
    { name: 'Edwards', category: 'Local Travel', billId: 'AT5461', amount: 58, payment: 'Corporate Card', approved: true },
    { name: 'Julia', category: 'Local Travel', billId: 'RR5492', amount: 71, payment: 'Self', approved: true },
    { name: 'Julia', category: 'Out of City Travel', billId: 'KT8785', amount: 277, payment: 'Bill to Company', approved: true },
    { name: 'Edwards', category: 'Others', billId: 'UR0400', amount: 25, payment: 'Corporate Card', approved: false },
    { name: 'Edwards', category: 'Out of City Travel', billId: 'CC6586', amount: 305, payment: 'Corporate Card', approved: false },
    { name: 'Julia', category: 'Communication', billId: 'DL3425', amount: 43, payment: 'Self', approved: false },
    { name: 'Julia', category: 'Out of City Travel', billId: 'MW65775', amount: 248, payment: 'Bill to Company', approved: true },
    { name: 'Edwards', category: 'Others', billId: 'JR56732', amount: 52, payment: 'Corporate Card', approved: true },
    { name: 'Julia', category: 'Out of City Travel', billId: 'BK0074', amount: 405, payment: 'Bill to Company', approved: false },
    { name: 'Edwards', category: 'Communication', billId: 'JR56732', amount: 72, payment: 'Corporate Card', approved: true }
]

let Category = ['Local Travel', 'Communication', 'Out of City Travel', 'Others']

let expenseErr = {}

let edetails = {}

let paymentSystem = ['Corporate Card', 'Bill to Company', 'Self']




//Show Expenses
function showExpenses() {
    let insertTable = document.getElementById('insertTable')
    insertTable.innerHTML = ''

    let showTheExpenseTable = showExpenseTable()

    let show = document.getElementById('show')
    show.innerHTML = showTheExpenseTable
}

//Expense Table

function showExpenseTable() {
    const mainHeading = `<h1 class="text-center">List Of Expenses For All Employees</h1>`
    const tableHeading = `
                        <thead class="table-dark">
                             <tr>
                                 <th scope="col">Name</th>
                                 <th scope="col">Category</th>
                                 <th scope="col">Bill Id</th>
                                 <th scope="col">Amount</th>
                                 <th scope="col">Payment</th>
                                 <th scope="col">Approved</th>
                                 <th></th>
                             </tr>
                         </thead>
                          `
    const tableBody = Expenses.map((exp, index) => {

        const { name, category, billId, amount, payment, approved } = exp

        let appBtn = (approved) ? '' : `<button type="button" class="btn btn-secondary" onclick="aprvTheBtn(${index})">Approved</button>`

        return `
                <tr>
                    <td>${name}</td>
                    <td>${category}</td>
                    <td>${billId}</td>
                    <td>${amount}</td>
                    <td>${payment}</td>
                    <td>${approved}</td>
                    <td>${appBtn}</td>
                </tr>
                `
    })

    return `${mainHeading} <table class="table  table-hover">${tableHeading}<tbody>${tableBody.join('')}</tbody></table>`
}

function aprvTheBtn(index) {
    Expenses[index].approved = 'true'
    showExpenses()
}


function showExpenseOfEmp(Empname) {
    let insertTable = document.getElementById('insertTable')
    insertTable.innerHTML = ''

    const mainHeading = `<h1 class="text-center">List Of Expenses For ${Empname}</h1>`
    const tableHeading = `
                        <thead class="table-dark">
                             <tr>
                                 <th scope="col">Name</th>
                                 <th scope="col">Category</th>
                                 <th scope="col">Bill Id</th>
                                 <th scope="col">Amount</th>
                                 <th scope="col">Payment</th>
                                 <th scope="col">Approved</th>
                                 <th></th>
                             </tr>
                         </thead>
                          `
    const tableBody = Expenses.map((exp, index) => {

        const { name, category, billId, amount, payment, approved } = exp

        let appBtn = (approved) ? '' : `<button type="button" class="btn btn-secondary" onclick="aprvTheExpBtn(${index})">Approved</button>`

        if (name == Empname) {
            return `
                   <tr>
                       <td>${name}</td>
                       <td>${category}</td>
                       <td>${billId}</td>
                       <td>${amount}</td>
                       <td>${payment}</td>
                       <td>${approved}</td>
                       <td>${appBtn}</td>
                   </tr>
                 `
        }

    })

    let cmpltTable = `${mainHeading} <table class="table  table-hover">${tableHeading}<tbody>${tableBody.join('')}</tbody></table>`


    let show = document.getElementById('show')
    show.innerHTML = `${cmpltTable}`
}

function aprvTheExpBtn(index) {
    Expenses[index].approved = true
    let name = Expenses[index].name
    showExpenseOfEmp(name)
}




function AddAnExpense() {

    let insertTable = document.getElementById('insertTable')
    insertTable.innerHTML = ''

    let { name = '', category = '', billId = '', amount = '', payment = '', approved = '' } = edetails


    let mainHeading = `<h1 align="center">Add a New Expense</h1>`

    //Making New DropDown For Expense Employee Name 
    let makeTheDropDown = makeDropDownForEmpSln('dpDown', Expenses, 'Select The Employee', name, expenseErr.name)

    //For Expense category DropDown We are using Employee Function  makeDropDown()
    let makeTheExpenseCategory = makeDropDown('expense', Category, 'Select The Expense Category', category, expenseErr.category)

    //For Making Bill Id We are using Employee Function  makeTextField()
    let EbillId = makeTextField('bid', 'Bill Id', 'Enter The Bill id', billId, expenseErr.billId)

    let Eamount = makeTextField('amt', 'Amount', 'Enter The Expense Amount', amount, expenseErr.amount)

    //For making Expense Radio We are using Employee Function makeRadio()
    let makeRadio = workExpRadio('How was the bill paid', 'expRadio', paymentSystem, payment, expenseErr.payment)

    //For Expense Approval Checkbox We are using Employee Function makeCheckBoxForChecking()
    let expChkBox = makeCheckBoxForChecking('Has The Expense been Approved', 'expCB', approved)


    let submitBtn = `<button type="submit"  class="btn btn-primary fix-size" onclick="SubmitExpense()">Submit</button>`

    let completeForm = mainHeading + makeTheDropDown + makeTheExpenseCategory + EbillId + Eamount + makeRadio + expChkBox + submitBtn

    let show = document.getElementById('show')
    show.innerHTML = completeForm

}


function makeDropDownForEmpSln(id, Exp, header, EditDept = '', err = '') {

    let str1 = err ? `<span class="text-danger size">${err}</span>` : ''

    let dpDownBody = Exp.map(opt => {
        let name = opt.name
        let selected = (name === EditDept) ? 'selected' : ''
        return `<option value="${name}" ${selected}>${name}</option>`
    })

    let selectedHeader = (EditDept == '') ? 'selected' : ''

    let dpheader = `<option disabled ${selectedHeader}>${header}</option>`

    let cmpltDpDown = `
                   <div class="form-group fix-size" >
                       <select id="${id}" class="form-control">
                           ${dpheader}
                           ${dpDownBody.join('')}
                       <select>
                       ${str1}
                   </div> `

    return `${cmpltDpDown}`
}


function SubmitExpense() {
    let Ename = document.getElementById('dpDown').value
    let ExpCtgy = document.getElementById('expense').value
    let billId = document.getElementById('bid').value
    let Amt = document.getElementById('amt').value

    let pymnt = document.getElementsByName('expRadio')
    let value = ''
    for (let i = 0; i < pymnt.length; i++) {
        if (pymnt[i].checked) {
            value = pymnt[i].value
        }
    }

    let app = document.getElementById('expCB').checked

    let newExp = { name: Ename, category: ExpCtgy, billId: billId, amount: Amt, payment: value, approved: app }

    console.log(newExp)

    if (validateExpenses(newExp)) {
        Expenses.push(newExp)
        showExpenses()
    } else {
        edetails = newExp
        AddAnExpense()
    }
}


function validateExpenses(newExp) {

    //validate Name
    let name = newExp.name
    let index1 = Expenses.findIndex(exp => exp.name === name)
    expenseErr.name = (index1 === -1) ? 'Select the name' : ''

    //Validate Category
    let ctgry = newExp.category
    let index2 = Category.findIndex(ctgy => ctgy === ctgry)
    expenseErr.category = (index2 === -1) ? 'Select the category' : ''

    expenseErr.billId = (newExp.billId) ? '' : 'Bill Id is mandatory'

    //Validate Amount
    expenseErr.amount = (newExp.amount) ? '' : 'Amount is mandatory'
    if (expenseErr.amount === '' && !Number(newExp.amount)) {

        if (newExp.amount <= 0) {
            expenseErr.amount = 'Plz Enter Valid Amount'
        } else {
            expenseErr.amount = 'Amount Should Be a Number'
        }

    }


    expenseErr.payment = (newExp.payment) ? '' : 'Choose The Payment Option'

    return !(expenseErr.name || expenseErr.category || expenseErr.billId || expenseErr.amount || expenseErr.payment)

}













//------------------------------------------------------Change The Table View------------------------------------------

function changeTheView() {
    const mainHeading = `<h1 class="text-center">List Of Employees</h1>`

    const tableBody = Employees.map((Emp, index) => {
        const { name, email, age, dept } = Emp
        return `
                <div class="col-4 bd">
                   <span class="redColor">Name:</span>${name}
                   </br>
                   <span class="redColor">Email:</span>${email}
                   </br>
                   <span class="redColor">Age:</span>${age}
                   </br>
                   <span class="redColor">Departement:</span>${dept}
                   </br>
                   <button type="submit" class="btn btn-success" onclick="showMoreDetails('${name}')">More Details</button>
                   </br>
                </div>
                `
    })

    let changeView = `<button type="submit"  class="btn btn-primary" onclick="showEmployees()">Orignal View</button>`

    const cmpltTableBody = `
                          <div class="container">
                             <div class="row align-items-start">
                                ${tableBody.join('')}  
                             </div>
                             <br>${changeView}
                         </div>
                          `
    return `${mainHeading}${cmpltTableBody}`
}


function showMoreDetails(EmployeeName) {
    const mainHeading = `<h1 class="text-center">List Of Employees</h1>`

    let findEmployee = Employees.find(emp => {
        return emp.name === EmployeeName
    })

    let createTable = Employees.map((emp) => {
        const { name, email, age, dept, gradCourse, gradYear, gradPerf, postgrad, workBefore, workEx } = emp
        if (emp.name === findEmployee.name) {
            return `
            <div class="col-4 bd">
               <span class="redColor">Name:</span>${name}
               </br>
               <span class="redColor">Email:</span>${email}
               </br>
               <span class="redColor">Age:</span>${age}
               </br>
               <span class="redColor">Departement:</span>${dept}
               </br>
               <span class="redColor">Graduation:</span>${gradCourse}
               </br>
               <span class="redColor">Year of Graduation:</span>${gradYear}
               </br>
               <span class="redColor">Performance in Graduation:</span>${gradPerf}
               </br>
               <span class="redColor">Post Graduate:</span>${postgrad}
               </br>
               <span class="redColor">Worked Before:</span>${workBefore}
               </br> 
               <span class="redColor">Work Exp:</span>${workEx}
               </br>   
            </div>
            `
        } else {

            return `
                    <div class="col-4 bd">
                       <span class="redColor">Name:</span>${name}
                       </br>
                       <span class="redColor">Email:</span>${email}
                       </br>
                       <span class="redColor">Age:</span>${age}
                       </br>
                       <span class="redColor">Departement:</span>${dept}
                       </br>
                       <button type="submit" class="btn btn-success" onclick="showMoreDetails('${name}')">More Details</button>
                       </br>
                    </div>
                    `
        }
    })

    let changeView = `<button type="submit"  class="btn btn-primary" onclick="showEmployees()">Orignal View</button>`

    const cmpltTableBody = `
                          <div class="container">
                             <div class="row align-items-start">
                                ${createTable.join('')}  
                             </div>
                             <br>${changeView}
                         </div>
                          `

    let insertTable = document.getElementById('insertTable')
    insertTable.innerHTML = `${mainHeading}${cmpltTableBody}`
}
