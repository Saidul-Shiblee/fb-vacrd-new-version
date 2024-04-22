export default function convertToArray(string) {
    // Split the string into an array of items
    var items = string.split(/\d+\.\s+/).filter(Boolean);

    // Remove double quotes from each item
    var cleanedItems = items.map(function (item) {
        return item.replace(/"/g, '').trim(); // trim to remove any leading/trailing whitespaces
    });

    return cleanedItems;
}