var csrf;

function initInstall() {
    if ($('.install').length == 0) {
        return;
    }

    // Database type change detection.
    $("#db_type").change(function () {
        var db_type = $('#db_type').val();
        if (db_type === "SQLite3") {
            $('#sql_settings').hide();
            $('#pgsql_settings').hide();
            $('#sqlite_settings').show();
            return;
        }

        var mysql_default = '127.0.0.1:3306';
        var postgres_default = '127.0.0.1:5432';

        $('#sqlite_settings').hide();
        $('#sql_settings').show();
        if (db_type === "PostgreSQL") {
            $('#pgsql_settings').show();
            if ($('#db_host').val() == mysql_default) {
                $('#db_host').val(postgres_default);
            }
        } else {
            $('#pgsql_settings').hide();
            if ($('#db_host').val() == postgres_default) {
                $('#db_host').val(mysql_default);
            }
        }
    });
};

function initRepository() {
    if ($('.repository').length == 0) {
        return;
    }

    // Labels
    if ($('.repository.labels').length == 0) {
        return;
    }
    $('.color-picker').each(function () {
        $(this).minicolors();
    });
    $('.precolors .color').click(function () {
        var color_hex = $(this).data('color-hex')
        $('.color-picker').val(color_hex);
        $('.minicolors-swatch-color').css("background-color", color_hex);
    });
    $('.delete-label-button').click(function () {
        var $this = $(this);
        $('.delete-label.modal').modal({
            closable: false,
            onApprove: function () {
                $.post($this.data('url'), {
                    "_csrf": csrf,
                    "id": $this.data("id")
                }).done(function (data) {
                    window.location.href = data.redirect;
                });
            }
        }).modal('show');
        return false;
    });
    $('.edit-label-button').click(function () {
        $('#label-modal-id').val($(this).data('id'));
        $('#label-modal-title').val($(this).data('title'));
        $('#label-modal-color').val($(this).data('color'))
        $('.minicolors-swatch-color').css("background-color", $(this).data('color'));
        $('.edit-label.modal').modal({
            onApprove: function () {
                $('.edit-label.form').submit();
            }
        }).modal('show');
        return false;
    });
};

$(document).ready(function () {
    csrf = $('meta[name=_csrf]').attr("content");

    // Semantic UI modules.
    $('.dropdown').dropdown();
    $('.jump.dropdown').dropdown({
        action: 'hide'
    });
    $('.slide.up.dropdown').dropdown({
        transition: 'slide up'
    });
    $('.ui.accordion').accordion();
    $('.ui.checkbox').checkbox();
    $('.poping.up').popup();

    initInstall();
    initRepository();
});