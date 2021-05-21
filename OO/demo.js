
class Branch {
    constructor() {

    }
}

class Stub extends Branch {
    constructor() {
        super();
    }
}

class Leaf {
    constructor() {
    }
}

class LivingBranch extends Branch {
    constructor() {
        super();
        this.leafs = [ ];
    }
}

class Trunk {
    constructor() {
        this.branches = [ ];
    }
}


class Tree {
    constructor() {
        this.trunk = new Trunk();
    }
}

const tree1 = new Tree();
tree1.trunk.branches.push(new Stub());
tree1.trunk.branches.push(new Stub());
tree1.trunk.branches.push(new Stub());
tree1.trunk.branches.push(new Stub());

const living1 = new LivingBranch();
living1.leafs.push(new Leaf());
living1.leafs.push(new Leaf());
living1.leafs.push(new Leaf());
living1.leafs.push(new Leaf());

tree1.trunk.branches.push(living1);

console.log(`Number of branches: ${tree1.trunk.branches.length}`, "Domain Model zu OOD - Demo");
console.log(`Number of leafs: ${living1.leafs.length}`, "Domain Model zu OOD - Demo");
