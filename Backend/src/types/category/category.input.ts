export interface CreateCategoryInput {
    name: string;
    description: string;
    image: string;
  }
  
  export interface UpdateCategoryInput {
    id: number;
    name?: string;
    description?: string;
    image?: string;
  }
  