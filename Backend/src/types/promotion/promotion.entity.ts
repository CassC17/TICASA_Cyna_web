export class PromotionEntity {
    constructor(
      public id: number,
      public name: string,
      public priceReduction?: number
    ) {}
  }
  