let body = document.querySelector('body');
let tags = ['header', 'main', 'footer'];
let contentParts = [];

for (let tag of tags) {
  let part = document.querySelector(tag);
  if (!part) continue;

  contentParts.push(part);
}

contentParts.forEach(part => wrapInDiv(part));

function wrapInDiv(elem) {
  let container = document.createElement('div');
  container.id = elem.tagName.toLowerCase() + '-wrapper';

  container.append(elem);
  body.append(container);
}