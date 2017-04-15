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
        $('li[listingid]').each(function () {
            // Convert to jQuery object
            var listing = $(this);

            // Default listing sold count to 0
            var soldCount = 0;

            // Get sold count as integer
            soldCount = parseInt(listing.find('.hotness-signal').text()) || 0;

            // Add item sold count and listing itself
            results.push({ sold: soldCount, listing: listing });

            // Delete element temporarily
            listing.remove();
        });

        // Sort all listings by sold count DESC
        results.sort(function (a, b) {
            return b.sold - a.sold;
        });

        // Get search results parent list
        var ul = $('ul#ListViewInner');

        // Warn the user about the modified result order
        ul.append('<li>These search results have been modified by <b>eBay™ Popularity Sort</b>.</li>');
        ul.append('<li><hr /></li>');

        // Re-add the sorted results
        results.forEach(function (item) {
            ul.append(item.listing);
        });
    });
});