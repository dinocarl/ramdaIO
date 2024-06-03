const assocPath = ([head, ...rest], value, obj) => Array.isArray(obj)
  ? [].concat(
    obj.slice(0, head),
    [rest.length
      ? assocPath(rest, value, obj[head])
      : value],
    obj.slice(head + 1))
  : Object.assign({},
    obj,
    {[head]: rest.length
      ? assocPath(rest, value, obj[head])
      : value
    });


const data = {
  a: {
    b: 2,
    c: 3,
    d: ['a', 'b'],
    e: [
      ['f', 'g'], ['h', 'i'], [['j', 'k'], ['l', 'm', 'n', {o: 'p'}]]
    ],
  },
  d: {
    e: 4
  }
};

const pth = ['a', 'e', 2, 1, 3, 'o'];

module.exports = [
  assocPath(pth, 8, data)
];
