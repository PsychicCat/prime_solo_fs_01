$(document).ready(function(){
    var $customers = $('#customers');
    var customers, shipping, billing;

    function matchCustomers(customers,shipping,billing){

        customers.forEach(function(elem){
            var $li = $('<li>');
            var $p = $('<p>');
            var $ul = $('<ul>');
            var customerId = elem.id;
            var $liBilling = $('<li>').attr('class', 'billing');
            var $liShipping = $('<li>').attr('class', 'shipping');

            $p.text(elem.firstName + " " + elem.lastName)
            $li.append($p);
            $p.append($ul);

            var shippingAddress = billing[customerId];
            var billingAddress = billing[customerId];
            $liShipping.text("Shipping Address: " + shippingAddress.addressLine1 + ", " + shippingAddress.addressLine2 + ", " + shippingAddress.city + ", " + shippingAddress.state + ", " + shippingAddress.zip);
            $liBilling.text("Billing Address: " + billingAddress.addressLine1 + ", " + billingAddress.addressLine2 + ", " + billingAddress.city + ", " + billingAddress.state + ", " + billingAddress.zip);

            $ul.append($liShipping);
            $ul.append($liBilling);



            shipping.forEach(function(elem){
                if(customerId == elem.customerId){
                    billingAddress = billing[customerId];
                    $liShipping.text("Shipping Address: " + elem.addressLine1 + ", " + elem.addressLine2 + ", " + elem.city + ", " + elem.state + ", " + elem.zip);
                    $liBilling.text("Billing Address: " + billingAddress.addressLine1 + ", " + billingAddress.addressLine2 + ", " + billingAddress.city + ", " + billingAddress.state + ", " + billingAddress.zip);

                    $ul.append($liShipping);
                    $ul.append($liBilling);
                }
            });
            $customers.append($li);
        });
    }


    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: '/customers',
        complete: function(){
            console.log('Customers complete');
        },
        success: function(data){
            customers = data;
            getShipping(customers);
            return customers;
        },
        error: function(req, errorType, errorMessage){
            console.log('There was an error: ', errorMessage);
        }
    });

    function getShipping(customers){
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: '/shipping',
            complete: function(){
                console.log('Shipping complete');
            },
            success: function(data){
                shipping = data;
                getBilling(customers, shipping);
                return shipping, customers;
            },
            error: function(req, errorType, errorMessage){
                console.log('There was an error: ', errorMessage);
            }
        });
    }

    function getBilling(customers, shipping){
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: '/billing',
            complete: function(){
                console.log('Billing complete');
            },
            success: function(data){
                billing = data;
                matchCustomers(customers,shipping,billing)
                return billing;
            },
            error: function(req, errorType, errorMessage){
                console.log('There was an error: ', errorMessage);
            }
        });
    }
});