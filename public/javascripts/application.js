// learnyt

var selectables = $('#response form .possible_answer');
selectables.css('cursor', "pointer");
selectables.click(function(element) {
  $('.possible_answer').removeClass('selected');
  $(this).addClass('selected');
  $('#response_possible_answer_id').val($(this).data('id'));
});

function addSelectableBehaviour() {
  var selectables = $('.possible_answers');
  selectables.css('cursor', "pointer");
  selectables.selectable({
    stop: function(event, ui) {
      var selected_id = $(".ui-selected", this).data('id');
      $(this).next().children('input').val(selected_id);
    }
  });
};

$(".sortable").bind('sortupdate', function(event, ui) {
  $(this).find('li.possible_answer').each(function(index, element) {
    $(this).find("input[id$='_position']").val(index + 1)
  });
});

// Correctness indicators
function addCorrectnessIndicatorBehaviour() {
  function setCorrectness(element) {
    var container = element.closest('li');
    var score = element.val();

    var correctness = 'close';
    if (score == 1.0) {
      correctness = 'correct';
    } else if (score == 0.0) {
      correctness = 'wrong';
    };

    element.removeClass('close correct wrong');
    container.removeClass('close correct wrong');
    element.addClass(correctness);
    container.addClass(correctness);
  }

  $("form .score input").change(function(event) {
    setCorrectness($(this));
  });

  $("form .score input").each(function() {
    setCorrectness($(this));
  });
};

// Nested Forms
function addNestedFormsBehaviour() {
  $(".destroy .action").each(function() {
    $(this).css('cursor', 'pointer');
    var container = $(this).closest(".destroyable");
    var checkbox = container.find("input[type='checkbox'][name$='[_destroy]']");
    $(this).closest('.destroy').find('label, input').hide();
  });

  $(".destroy .action").click(function() {
    var container = $(this).closest(".destroyable");
    var checkbox = container.find("input[type='checkbox'][name$='[_destroy]']");
    checkbox.attr('checked', true);
    container.fadeOut('slow');
  });
};

// Autocompletion
function addAutocompleteBehaviour() {
  $("input[data-autocomplete]").autocomplete({
    source: function( request, response ) {
      $.ajax({
        // Should use RAILS_ROOT or something...
        url: "/answers.json",
        dataType: "json",
        data: {
          per_page: 12,
          by_title: request.term
        },
        success: function( data ) {
          response( $.map( data, function( object ) {
            item = object.answer;
            return {
              label: item.title,
              value: item.title
            }
          }));
        }
      });
    },
    minLength: 2,
    select: function( event, ui ) {
    },
    open: function() {
      $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
    },
    close: function() {
      $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
    }
  });
};

function addQuestionSelectionBehaviour() {
  // Hide unused elements for js users.
  $("#all_questions > li").css('cursor', "pointer");
  $("#all_questions > li > fieldset.inputs").hide();

  // Sort questions
  $('ul#all_questions > li').each(function() {
    if($(this).find("input[id$='_destroy']:checked").val() == 1){
      $('#selected_questions').append($(this));
    }else{
      $('#available_questions').append($(this));
    }
  });

  $("#available_questions, #selected_questions").sortable({
    connectWith: '.question_select',
    update: function(event, ui) {
      $(this).find('li.quiz_question').each(function(index, element) {
        // Update position
        $(this).find("input[id$='_position']").val(index + 1);
        // Update destroy flag
        $(this).find("input[id$='_destroy']").attr('checked',
          $(this).parents("#selected_questions").length == 0
        );
      });
    }
  }).disableSelection();
}

// Loads functions after DOM is ready
$(document).ready(function() {
    addSelectableBehaviour();
    addAutocompleteBehaviour();
    addNestedFormsBehaviour();
    addCorrectnessIndicatorBehaviour();
    addQuestionSelectionBehaviour();
});
