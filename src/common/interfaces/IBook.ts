export interface IBook {
    _id: string;
    title: string;
    genre: string;
    pages: string; 
    status: boolean;
    adminData: {
      _id: string;
      username: string;
    };
  }
  