export interface CreateCategoryInput {
    name: string;
    description: string;
  }
  
  export interface UpdateCategoryInput {
    id: number;
    name?: string;
    description?: string;
  }
  