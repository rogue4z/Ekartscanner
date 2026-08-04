function extractShipmentIds(text) {

    // Find strings made of capital letters followed by numbers
    const matches = text.match(/[A-Z]{2,10}[0-9]{8,20}/g);

    if (!matches)
        return [];

    // Remove duplicates
    return [...new Set(matches)];

}