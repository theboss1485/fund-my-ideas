// This function formats a data to be more human-readable.
function formatDate(date){

    console.log("date formate");

    let options = {

        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    };
      
    let formattedDate = date.toLocaleString('en-US', options);
    return formattedDate;
}

module.exports = formatDate