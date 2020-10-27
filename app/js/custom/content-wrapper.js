let tags = ['header', 'main', 'footer'];
let contentParts = [];

for (let tag of tags) {
  if (!$(tag)) continue;
  contentParts.push($(tag));
}

contentParts.forEach(part => part.wrap(
  `<div id="${part.prop('tagName').toLowerCase()}-wrapper"></div>`)
);