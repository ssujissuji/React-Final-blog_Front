interface Author {
  _id: string;
  profilImage: string;
  nickname: string;
}

interface Comment {
  author: Author;
  content: stirng;
  _id: string;
  createdAt: string;
}

interface Post {
  _id: string;
  title: string;
  category: string;
  thumbnail: string;
  content: string;
  author: Author;
  comments: [];
  viewCount: number;
  createdAt: string;
}

interface Pagination {
  totalCount: number;
  currentPage: number;
  perPage: number;
  maxPage: number;
}
