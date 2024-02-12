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