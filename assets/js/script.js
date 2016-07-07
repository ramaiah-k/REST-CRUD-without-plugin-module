
function getAllUsers() {
	// These are called on page load
	var request = new XMLHttpRequest();
	request.open('GET', 'http://localhost:8001/crud-operation/', true);

    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            
            var data = JSON.parse(this.response); //All Students
            // console.log(data.results[0].sname);
            generateAllUserListHTML(data);

        } else {
            // We reached our target server, but it returned an error

        }
    };

    request.onerror = function () {
        // There was a connection error of some sort
    };

    request.send();	
}

getAllUsers();


var model = document.querySelector('.model');
var model_bg = document.querySelector('.model-bg');

// function display_model() {
// 	model.style.display = "block";
// 	model_bg.style.display = "block";
// }

var container = document.querySelector('.list-user');
var temp_userlist = document.querySelector('#list-user').content;
var temp_userAdd = document.querySelector('#add-user').content;
var temp_userUpdate = document.querySelector('#update-user').content;
var add_more_user = document.querySelector('#add-more-user');

add_more_user.addEventListener('click',userAddFormListener);

function generateAllUserListHTML(data) {
	
	for (var i = 0; i < data.results.length; i++) {
		var temp_ul = temp_userlist.cloneNode(true);
		var cells = temp_ul.querySelectorAll('.cell');

		cells[0].innerHTML = data.results[i].sname;
		cells[1].innerHTML = data.results[i].sage;
		cells[2].innerHTML = data.results[i].mark1;
		cells[3].innerHTML = data.results[i].mark2;
		cells[4].innerHTML = data.results[i].mark3;
		cells[5].children[0].setAttribute('data-sname', data.results[i].sname);
		// cells[5].children[0].addEventListener('click',userEditListener);

		cells[5].children[1].setAttribute('data-sname', data.results[i].sname);
		// cells[5].children[1].addEventListener('click',userDeleteListener);
		container.appendChild(document.importNode(temp_ul, true));

		var btns = container.querySelector('.row:last-child .actions');

		btns.children[0].addEventListener('click',userEditFormListener);
		btns.children[1].addEventListener('click',userDeleteListener);
		
	}
}

function userAddFormListener(event) {

	temp_UA = temp_userAdd.cloneNode(true);
	model.children[1].appendChild(document.importNode(temp_UA, true));

	// model.children[1].querySelector('.btn-cancel').addEventListener('click',modelCloseBtn);
	
	model.children[1].querySelector('.btn-submit').addEventListener('click',userAddListener);	
		console.log(model.children[1].querySelector('.btn-cancel'));
		console.log(model.children[1].querySelector('.btn-submit'));

	model.style.display = "block";
	model_bg.style.display = "block";
	model.querySelector('.close-btn').addEventListener('click',modelCloseBtn);
}
function userAddListener(event) {
	event.preventDefault();
	console.log(this.parentNode.querySelectorAll('input'));
	var form_values = this.parentNode.querySelectorAll('input');
	var qs = '';
	for (var i = form_values.length - 1; i >= 0; i--) {
		qs += form_values[i].getAttribute('name')+'='+form_values[i].value+'&';
	}
	console.log(qs);
	var request = new XMLHttpRequest();
	request.open("POST", "http://localhost:8001/crud-operation/", true);
	request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	request.send(qs);//"fname=Henry&lname=Ford"
	getAllUsers();
}

function userEditFormListener(event) {
	temp_UU = temp_userUpdate.cloneNode(true);
	model.children[1].appendChild(document.importNode(temp_UU, true));
	// console.log(this.getAttribute('data-sname'));
	model.children[1].querySelector('.btn-submit').addEventListener('click',userEditListener);

	var sname_value = this.getAttribute('data-sname');
	var input_elm = model.children[1].querySelectorAll('.control-fields');
	console.log(input_elm);
	model.style.display = "block";
	model_bg.style.display = "block";
	model.querySelector('.close-btn').addEventListener('click',modelCloseBtn);


	var request = new XMLHttpRequest();
	request.open('GET', 'http://localhost:8001/crud-operation/?sname='+sname_value, true);

    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            
            var data = JSON.parse(this.response); //All Students
            console.log(data.results[0].sname);
            // console.log(input_elm);

            
            input_elm[0].value = data.results[0].sname;
            input_elm[1].value = data.results[0].sage;
            input_elm[2].value = data.results[0].mark1;
            input_elm[3].value = data.results[0].mark2;
            input_elm[4].value = data.results[0].mark3;

            // generateAllUserListHTML(data);

        }
    };
    request.onerror = function () {
        // There was a connection error of some sort
    };
    request.send();	




}
function userEditListener(event) {
	console.log('userEditListener');
	console.log(this.getAttribute('data-sname'));

	var request = new XMLHttpRequest();
	request.open('PUT', 'http://localhost:8001/crud-operation', true);

    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            
            var data = JSON.parse(this.response); //All Students
            console.log(data.results[0]);
            

        }
    };

    request.onerror = function () {};
    request.send();

}

function userDeleteListener(event) {
	console.log('userDeleteListener');
	console.log(this.getAttribute('data-sname'));
}

function modelCloseBtn(event) {
	event.preventDefault();
	this.removeEventListener('click',modelCloseBtn);
	this.parentNode.children[1].innerHTML ='';
	model.style.display = "none";
	model_bg.style.display = "none";
}