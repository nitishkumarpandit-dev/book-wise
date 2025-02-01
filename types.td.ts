interface BookProps {
  id: number;
  title: string;
  author: string;
  genre: string;
  rating: number;
  totalCopies: number;
  availableCopies: number;
  description: string;
  coverColor: string;
  coverUrl: string;
  isLoanedBook?: boolean;
}

interface SignInSchema {
  email: string;
  password: string;
}

interface SignUpSchema {
  fullName: string;
  email: string;
  universityId: number;
  universityCard: string;
  password: string;
}
