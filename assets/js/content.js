// Wait for document to load
$(document).ready(function () {
    // Get on/off toggle value for this feature
    chrome.storage.sync.get({
        enableSortByPopularity: true
    }, function (options) {
        // Check whether this feature is disabled
        if (!options.enableSortByPopularity) {
            return;
        }

        // Array of search results
        var results = [];

        // Traverse search results
        $('li[listingid]:has(.hotness-signal)').each(function () {
            // Convert to jQuery object
            var listing = $(this);

            if (listing.find('.hotness-signal:contains(" sold")').length) {
            // Default listing sold count to 0
            var soldCount = 0;

            // Get sold count as integer
            soldCount = parseInt(listing.find('.hotness-signal:contains(" sold")').text()) || 0;

            // Add item sold count and listing itself
            results.push({ sold: soldCount, listing: listing });

            // Delete element temporarily
            listing.remove();
            }
        });

        // Sort all listings by sold count DESC
        results.sort(function (a, b) {
            return b.sold - a.sold;
        });

        // Get search results parent list
        var ul = $('ul#ListViewInner');

        // Re-add the sorted results
        ul.prepend(results.map(function(item){
            return item.listing;
        }));

        // Warn the user about the modified result order
        ul.prepend('<li><hr /></li>');
        ul.prepend('<li>These search results have been modified by <b>eBay™ Popularity Sort</b>.</li>');
    });
});