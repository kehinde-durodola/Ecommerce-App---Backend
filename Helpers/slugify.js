const slugify = (title) => {
    const baseSlug = title
        .toLowerCase()
        .replace(/[^a-zA-Z0-9 ]/g, "")
        .replace(/\s+/g, "-");
    const timestamp = Date.now();
    return `${baseSlug}-${timestamp}`;
};

const slugifyCategory = (category) => {
    const baseSlug = category
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .replace(/\s+/g, "-");
    return baseSlug;
};


module.exports = { slugify, slugifyCategory }