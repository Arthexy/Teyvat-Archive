const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const context = vm.createContext({});
vm.runInContext(fs.readFileSync('static/js/skeleton.js', 'utf8'), context);
const render = context.loadingSkeleton;
const cards = render('cards', 'Loading showcase', 8);
assert.equal((cards.match(/class="character-card skeleton-item"/g) || []).length, 8);
assert.match(cards, /role="status"/);
assert.match(cards, /aria-hidden="true"/);
assert.match(render('profile', '<img src=x onerror="alert(1)">', 1), /&lt;img/);
assert.doesNotMatch(render('profile', '<img src=x>', 1), /<img/);
const template = fs.readFileSync('templates/dashboard.html', 'utf8');
assert(template.indexOf('skeleton.js') < template.indexOf('app.js'));
console.log('Skeleton checks passed');

for (const [kind,layout] of [['profile','profile-record'],['rows','<table>'],['notes','resources'],['summary','resource'],['explore','explore-grid'],['detail','build-layout']]) assert(render(kind,'Loading',3).includes(layout));
assert.equal((render('rows','Loading',2).match(/<td>/g)||[]).length,16);
