module.exports = function(data) {
    if (typeof data !== "string") return data;
    
    try {
        return JSON.parse(data);
    } catch {
        return null;
    }
}