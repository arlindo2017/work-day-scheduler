// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // Save button function to store entry to local storage when user clicks save button
  $('.saveBtn').click(function() {
    var btnClickId = $(this).parent().attr('id'); 
    var clickFieldValue = $.trim($(this).parent().children('textarea').val());
    if (clickFieldValue.length < 1) {
      $('#calendar-entry-error').modal('show')
      return;
    }else {
      localStorage.setItem(btnClickId, clickFieldValue);
    } 
  }); 

  // Delete button function to delete entry from local storage when user clicks delete button
  $('.deleteBtn').click(function() {
    var clickFieldValue = $.trim($(this).parent().children('textarea').val());
    if (clickFieldValue.length < 1) {
      alert("Nothing to Delete");
      return;
    }else {
      var confirmDel = confirm("Are you sure you want to delete this entry?")
      if(confirmDel === true) {
        localStorage.removeItem($(this).parent().attr('id')); 
        $(this).parent().children('textarea').val("");
      }else {
        return;
      }
    } 
  });
  
  // get current hour using dayjs
  var currentHour = dayjs().format('H');

  // identify all time-blocks elements
  $('.time-block').each(function() {
    //gets the attribute from ID
    var id = $(this).attr('id');
    //splits string on "-" to return the hour value, string is converted to a number using parseInt() to be able to compare against hour
    var hour = parseInt(id.split('-')[1]);
    // compares hour from ID to current hour, adds class past, future or present to that div.
    if (parseInt(hour) < currentHour) {
      $(this).addClass("past");
    } else if (parseInt(hour) > currentHour) {
      $(this).addClass("future");
    } else {
      $(this).addClass("present");
    }
  });
  
  
  // TODO: Add code to get any user input that was saved in localStorage and set
  $('#hour-9 .description').val(localStorage.getItem('hour-9'));
  $('#hour-10 .description').val(localStorage.getItem('hour-10'));
  $('#hour-11 .description').val(localStorage.getItem('hour-11'));
  $('#hour-12 .description').val(localStorage.getItem('hour-12'));
  $('#hour-13 .description').val(localStorage.getItem('hour-13'));
  $('#hour-14 .description').val(localStorage.getItem('hour-14'));
  $('#hour-15 .description').val(localStorage.getItem('hour-15'));
  $('#hour-16 .description').val(localStorage.getItem('hour-16'));
  
  // TODO: Add code to display the current date in the header of the page.
  var currentDayEl = $('#currentDay');
  var currentDate = dayjs().format('MMMM D, YYYY');
  currentDayEl.text(currentDate);
});
