window.onload = function(){
    // Buttons
    let quickAddBtn = document.getElementById("QuickAdd");
    let AddBtn = document.getElementById("Add");
    let cancelBtn = document.getElementById("Cancel");
    // let quickAddFormDiv = document.querySelector('.quickaddForm');
    let quickAddFormDiv = document.getElementsByClassName('quickaddForm')[0];

    // Form Fields
    let fullname = document.getElementById("fullname");
    let phone = document.getElementById("phone");
    let email = document.getElementById("email");

    let addBookDiv = document.querySelector(".addbook");

    let addressBook = [];

    quickAddBtn.addEventListener("click", function(){
        quickAddFormDiv.style.display = "block";
    });

    cancelBtn.addEventListener("click", function(){
        quickAddFormDiv.style.display = "none";
    });

    AddBtn.addEventListener("click", addToBook);

    addBookDiv.addEventListener("click", removeEntry);

    function jsonStructure(fullname, phone, email){
        this.fullname = fullname;
        this.phone = phone;
        this.email = email;
    }

    function addToBook(){
       let isNull = fullname.value != '' && phone.value != '' && email.value != '';
       console.log(isNull);
       if(isNull){
        let obj =new jsonStructure(fullname.value, phone.value, email.value);
        addressBook.push(obj);
        localStorage['addbook'] = JSON.stringify(addressBook);
        quickAddFormDiv.style.display = "none";
        clearForm();
        showAddressBook();
       }
    }

    function removeEntry(e){
        if(e.target.classList.contains("delbutton")){
            let remID = e.target.getAttribute("data-id");
            addressBook.splice(remID, 1);
            localStorage['addbook'] = JSON.stringify(addressBook);
            showAddressBook();
        }
    }

    function clearForm(){
        let frm = document.querySelectorAll(".formfields");
        for(let i in frm){
            frm[i].value = '';
        }
    }

    function showAddressBook(){
        if (localStorage['addbook'] === undefined){
            localStorage['addbook'] = "[]";
        } else {
            addressBook = JSON.parse(localStorage['addbook']);
            addBookDiv.innerHTML = '';
            for(let n in addressBook){
                let str = '<div class ="entry">';
                    str += '<div class ="name:><p>' + addressBook[n].fullname + '</p></div>';
                    str += '<div class ="phone:><p>' + addressBook[n].phone + '</p></div>';
                    str += '<div class ="email:><p>' + addressBook[n].email + '</p></div>';
                    str += '<div class ="del"><a href ="#" class = "delbutton" data-id="' + n + '">Delete</a></div"';
                    str += '</div>';
                    addBookDiv.innerHTML += str;
            }
        }
    }
        
        showAddressBook();
} 