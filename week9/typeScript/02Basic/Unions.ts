let score: number | string = 33;

score = 44;
score = "456";

type User = {
  name: string;
  id: number;
};

type Admin = {
  username: string;
  id: number;
};

let hites: User | Admin = { name: "hiteah", id: 334 };

function getDbId(id: number | string) {
  console.log();
}

type Bird = { fly: () => void };
type Fish = { swim: () => void };

function move(animal: Bird | Fish) {
  // animal.fly();  // Error - animal could be Fish

  if ("fly" in animal) {
    animal.fly();
  } else {
    animal.swim();
  }
}

interface Square {
  kind: "square";
  size: number;
}

interface Circle {
  kind: "circle";
  radius: number;
}

type Shape = Square | Circle;

function area(shape: Shape) {
  switch (shape.kind) {
    case "square":
      return shape.size * shape.size;
    case "circle":
      return Math.PI * shape.radius ** 2;
  }
}

console.log(area({ kind: "square", size: 5 }));  // 25
console.log(area({ kind: "circle", radius: 3 })); // ~28.27

