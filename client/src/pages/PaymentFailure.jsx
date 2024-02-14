
// This function defines a page that the application redirects to if a stripe payment fails.
export default async function PaymentFailure() {

    setTimeout(function() {

        window.location.href = "/";
        
    }, 5000);
    return (
        <div className="text-center">
            <p>Your payment was not successful. You will now be redirected to our home page. </p>
        </div>
    )
}