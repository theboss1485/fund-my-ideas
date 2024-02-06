function formatDate(date){

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