$(function () {
    // Get initial stored toggle value
    chrome.storage.sync.get({
        enableSortByPopularity: true
    }, function(items) {
        // Set checkbox checked value based on stored toggle value
        $('#enable-sort-by-popularity').prop('checked', items.enableSortByPopularity);
    });

    $('#enable-sort-by-popularity').change(function(){
        // Update stored toggle value using checkbox checked property
        chrome.storage.sync.set({
            enableSortByPopularity: $('#enable-sort-by-popularity').prop('checked')
        });
    });
});