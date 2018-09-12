/** src/tree.js */
/* eslint-disable */

function dataTree(schema, cb) {
  const dataTree = [];
  const stack = [];
  // parse bootstrap tree eg {text:'Parent, nodes[{text:'Child'}]} from data schema
  let current = { key: 'schema', value: schema, parent: dataTree };// root
  while (current) {
    if (current.value !== 'leaf') {
      const node = { text: current.key, state: { expanded: false, checked: false }, nodes: [] };
      for (let c of Object.keys(current.value)) {
        stack.push({ key: c, value: current.value[c], parent: node.nodes });
      }
      current.parent.push(node);
    } else {
      const node = { text: current.key, state: { expanded: false, checked: false } };
      current.parent.push(node);
    }
    current = stack.pop();
  }
  this.root = dataTree[0].nodes[0].nodes;
  this.parse = function (desc, done) {
    const emptyDataTree = this.root;
    const tree = JSON.parse(JSON.stringify(emptyDataTree));// copy
    let descTree = { id: desc.name, tree };
    for (let path of desc.group) {
      let level = tree;
      for (let e of path) {
        if (level) {
          if (e === '*') {
            for (let node of level) {
              node.state.checked = true;
              node.state.expanded = true;
              node.color = '#21a9af';
            }
            level = undefined;
          } else if (e === '**') {
            const s = Array.from(level);
            let c = s.pop();
            while (c) {
              c.state.checked = true;
              c.state.expanded = true;
              c.color = '#21a9af';
              if (c.nodes) {
                for (let node of c.nodes) {
                  s.push(node);
                }
              }
              c = s.pop()
            }
            level = undefined;
          } else {
            for (let node of level) {
              if (node.text === e) {
                node.state.checked = true;
                node.state.expanded = true;
                node.color = '#21a9af';
                level = node.nodes;
              }
            }
          }
        }
      }
    }
    return done(null, descTree);
  }
  return cb(null, this);
}

function flatTree(dataTree, cb) {
  const consents = [];
  for (let permission of dataTree) {
    const consent = { id: permission.id, group: [] };
    consents.push(consent);

    for (let path of permission.tree) {
      if (path.state.checked) {
        const children = [path];
        const s = {};
        let current = children.pop();
        s[current.text] = [current.text];
        while (current) {
          if (current.nodes) {
            for (let child of current.nodes) {
              children.push(child);
              const s_branch = Array.from(s[current.text]);
              s_branch.push(child.text);
              s[child.text] = s_branch;
            }
          } else {
            consent.group.push(s[current.text]);
          }
          current = children.pop();
        }
      }
    }
  }
  return cb(null, consents);
}
module.exports.tree = dataTree;
module.exports.flat = flatTree;
