function fill(list, tree) {
  if (tree.value === undefined) return list;

  list["value"] = tree.value;

  if (tree.left !== undefined) {
    list["next"] = new Object();

    list = fill(list.next, tree.left);
  }

  if (tree.right !== undefined) {
    list["next"] = new Object();

    list = fill(list.next, tree.right);
  }
  return list;
}
function converter(root) {
  let list = new Object();

  let final = fill(list, root);
  return list;
}

let root1 = {
  value: 13,
  left: {
    value: 5,
    left: {
      value: 3,
    },
    right: {
      value: 10,
      left: {
        value: 8,
      },
    },
  },
  right: {
    value: 18,
    left: {
      value: 14,
      right: {
        value: 16,
      },
    },
    right: {
      value: 26,
    },
  },
};
console.log(converter(root1));
