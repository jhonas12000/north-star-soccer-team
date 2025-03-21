interface Player {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
}

interface Parent {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  children: Child[];
}

// interface PlayerTableProps {
//   players: Player[];
// }
