// save changes
function saveChanges($form) {
  $submit = $form.find('[type="submit"]');

  $submit.on('click', function (e) {
    e.preventDefault();
    $form.find('input').each(function () {
      if ($(this).val() === '') {
        $(this).closest('.ui__form-section').addClass('error');
      } else {
        $(this).closest('.ui__form-section').removeClass('error');
      }
    });
    $form.find('select').each(function () {
      var value = $(this).val();
      $(this).data('start', value);
      if ($(this).val() === '') {
        $(this).closest('.ui__form-section').addClass('error');
      } else {
        $(this).closest('.ui__form-section').removeClass('error');
      }
    });
    hideChangesButtons($form);
  });
};

// discard changes
function discardChanges($form, $list) {
  var $cancel = $form.find('.js__discard-change');

  $cancel.on('click', function (e) {
    e.preventDefault();
    for (var item in $list) {
      $form.find('[name="' + item + '"]').val($list[item]);
    }
    $form.find('select').each(function(){
      $(this).selectric('refresh');
    })
    hideChangesButtons($form);
  });
};

// show changes buttons
function showChangesButtons($form) {
  var $submit = $form.find('[type="submit"]');
  var $cancel = $form.find('.js__discard-change');

  $form.addClass('is__change');
  $submit.attr('disabled', false);
  $cancel.show();
};

// hide changes buttons
function hideChangesButtons($form) {
  var $submit = $form.find('[type="submit"]');
  var $cancel = $form.find('.js__discard-change');

  $form.removeClass('is__change');
  $submit.attr('disabled', true);
  $cancel.hide();
};

// change value
function changeValue($form, $list){
  if ($form.hasClass('is__change')) {
    return;
  }

  $form.find('input').each(function () {
      $list[$(this).prop('name')] = $(this).val();
  });
  $form.find('select').each(function () {
      $list[$(this).prop('name')] = $(this).data('start');
  });
  showChangesButtons($form);
}

// form actions
function formActions() {
  $('.js__form').each(function () {
    var $form = $(this);
    var $list = [];

    $form.on('submit', function (e) {
      e.preventDefault();
    });

    $(this).find('input').on('keypress change', function () {
      changeValue($form, $list);
    });

    $(this).find('select').on('change', function () {
      changeValue($form, $list);
    });

    saveChanges($form);
    discardChanges($form, $list);
  });
}

// init select plugin
function initSelectPlugin() {
  $('select').each(function () {
    $(this).selectric();
  })
};


$(function () {

  initSelectPlugin();

  formActions();

});