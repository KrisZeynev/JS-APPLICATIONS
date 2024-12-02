// document.querySelector("#user").style.display = "none";
// const notification = document.querySelector(".notification");


// const loginForm = document.querySelector("main form")

// // check to get password via session storage
// loginForm.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const {email, password} = Object.fromEntries(new FormData(e.target));
    
//     if (!email || !password) {
//         notification.innerHTML = 'Please fill all fields!'
//         return
//     }
//     notification.innerHTML = '';

//     try {
//         const response = await fetch('http://localhost:3030/users/login', {
//             method: 'POST',
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({email, password})
//         });
//         console.log(response);
//         const data = await response.json();
//         // console.log(data);
  
//          if (response.status === 200) {
//             sessionStorage.setItem('accessToken', data.accessToken);
//             sessionStorage.setItem('userEmail', data.email);
//             sessionStorage.setItem('userId', data._id);
//             // location.href = 'index.html';
//             window.location.assign('./index.html')
//         } else {
//             notification.innerHTML = data.message;
//         }
        
//     } catch (error) {
//         console.log(error.message);
//     }
    
// })

// // document.querySelector('#logout').style.display = 'none';

// // const form = document.querySelector('form');
// // const notification = form.querySelector('.notification');

// // form.addEventListener('submit', login);

// // async function login(e) {
// //     e.preventDefault();

// //     let formData = new FormData(e.target);

// //     let email = formData.get('email');
// //     let password = formData.get('password');

// //     if (email == '' || password == '') {
// //         notification.textContent = 'All fields are required!'
// //         return;
// //     }

// //     try {
// //         let response = await fetch('http://localhost:3030/users/login', {
// //             method: 'POST',
// //             headers: {
// //                 'content-type': 'application/json'
// //             },
// //             body: JSON.stringify({
// //                 email,
// //                 password
// //             })
// //         })
// //         let data = await response.json();

// //         if (!response.ok || response.status != 200) {
// //             form.reset();
// //             throw new Error(error.message)
// //         }

// //         sessionStorage.setItem('accessToken', data.accessToken);
// //         sessionStorage.setItem('email', data.email);
// //         sessionStorage.setItem('username', data.username);
// //         sessionStorage.setItem('_id', data._id);
// //         window.location.href = './index.html'

// //     } catch (error) {
// //         notification.textContent = error.message;
// //     }
// // }