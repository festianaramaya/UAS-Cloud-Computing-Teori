let token = "";

const BASE_URL = "http://localhost";

async function login(){

    const username=document.getElementById("username").value;

    const password=document.getElementById("password").value;

    const response=await fetch(`${BASE_URL}/login`,{

        method:"POST",

        headers:{

            "Content-Type":"application/json"

        },

        body:JSON.stringify({

            username,

            password

        })

    });

    const data=await response.json();

    token=data.token;

    alert(data.message);

}

async function getProducts(){

    const response=await fetch(`${BASE_URL}/products`,{

        headers:{

            Authorization:`Bearer ${token}`

        }

    });

    const data=await response.json();

    let html="";

    data.forEach(product=>{

        html+=`

        <li>

        ${product.name}

        -

        Rp ${product.price}

        </li>

        `;

    });

    document.getElementById("products").innerHTML=html;

}

async function createOrder(){

    const product_name=document.getElementById("product").value;

    const quantity=document.getElementById("quantity").value;

    const response=await fetch(`${BASE_URL}/orders`,{

        method:"POST",

        headers:{

            "Content-Type":"application/json",

            Authorization:`Bearer ${token}`

        },

        body:JSON.stringify({

            product_name,

            quantity

        })

    });

    const data=await response.json();

    alert(data.message);

}

async function getOrders(){

    const response=await fetch(`${BASE_URL}/orders`,{

        headers:{

            Authorization:`Bearer ${token}`

        }

    });

    const data=await response.json();

    let html="";

    data.forEach(order=>{

        html+=`

        <li>

        ${order.product_name}

        x

        ${order.quantity}

        </li>

        `;

    });

    document.getElementById("orders").innerHTML=html;

}