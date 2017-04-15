$(function () {
    chrome.storage.sync.get({
        enableSortByPopularity: true
    }, function(items) {
        $('#enable-sort-by-popularity').prop('checked', items.enableSortByPopularity)
    });

    $('#enable-sort-by-popularity').change(function(){
        chrome.storage.sync.set({
            enableSortByPopularity: $('#enable-sort-by-popularity').prop('checked')
        }, function() {
        });
    })

});